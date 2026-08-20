import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';

// Renders a `:::type ... :::` container as markdown-aware HTML. Depth is
// tracked across ALL container fences (not just same-typed ones) so a
// `:::row` can hold nested `:::col` blocks without closing early.
const CONTAINER_TEMPLATES = {
  row: (html) => `<div class="content-row">${html}</div>`,
  col: (html) => `<div class="content-col">${html}</div>`,
  slider: (html) =>
    `<div class="content-slider"><div class="content-slider__wrapper">${html}</div></div>`,
  slide: (html) => `<div class="content-slider__slide">${html}</div>`,
};

const containerExtension = {
  name: 'container',
  level: 'block',
  start(src) {
    const match = src.match(/:::[a-zA-Z]/);

    return match ? match.index : undefined;
  },
  tokenizer(src) {
    const openMatch = /^:::([a-zA-Z][\w-]*)[ \t]*\n/.exec(src);

    if (!openMatch) {
      return undefined;
    }

    const lines = src.split('\n');
    let depth = 1;
    let closeLineIndex = -1;

    for (let i = 1; i < lines.length; i++) {
      if (/^:::[a-zA-Z][\w-]*[ \t]*$/.test(lines[i])) {
        depth++;
      } else if (/^:::[ \t]*$/.test(lines[i])) {
        depth--;
        if (depth === 0) {
          closeLineIndex = i;
          break;
        }
      }
    }

    if (closeLineIndex === -1) {
      return undefined;
    }

    const bodyLines = lines.slice(1, closeLineIndex);
    let raw = lines.slice(0, closeLineIndex + 1).join('\n');

    if (src.length > raw.length && src[raw.length] === '\n') {
      raw += '\n';
    }

    const token = {
      type: 'container',
      raw,
      containerType: openMatch[1],
      tokens: [],
    };

    this.lexer.blockTokens(bodyLines.join('\n'), token.tokens);

    return token;
  },
  renderer(token) {
    const inner = this.parser.parse(token.tokens);
    const wrap = CONTAINER_TEMPLATES[token.containerType];

    return (
      (wrap
        ? wrap(inner)
        : `<div class="content-${token.containerType}">${inner}</div>`) + '\n'
    );
  },
};

marked.use({ extensions: [containerExtension] });

function parseMarkdownFiles(options) {
  console.log('Generate static JSON:API');
  fs.mkdirSync(options.outputDir, { recursive: true });

  for (const resource of options.resources) {
    const contentAttribute = resource.contentAttribute;
    const sourcePath = path.join(options.sourceDir, resource.type);

    if (!fs.existsSync(sourcePath)) {
      console.warn(
        `[static-json-api] Source directory not found: ${sourcePath}`,
      );
      continue;
    }

    const files = fs.readdirSync(sourcePath).filter((f) => f.endsWith('.md'));

    const records = files.flatMap((filename) => {
      try {
        const raw = fs.readFileSync(path.join(sourcePath, filename), 'utf8');
        const { data, content } = matter(raw);
        const id = filename.replace(/\.md$/, '');

        const attributes = { ...data };

        if (contentAttribute) {
          attributes[contentAttribute] = marked(content);
        }

        return {
          type: resource.type,
          id,
          attributes,
        };
      } catch (err) {
        console.error(
          `[static-json-api] Failed to parse ${filename}: ${err.message}`,
        );
        return [];
      }
    });

    const outputPath = path.join(options.outputDir, resource.type);
    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(
      path.join(outputPath, 'index.json'),
      JSON.stringify({ data: records }, null, 2),
    );

    for (const record of records) {
      fs.writeFileSync(
        path.join(outputPath, `${record.id}.json`),
        JSON.stringify({ data: record }, null, 2),
      );
    }

    console.log(
      `✓ Built ${resource.type} (${records.length} items) → ${outputPath}`,
    );
  }
  console.log('\n');
}

function isJsonApiFile(file, options) {
  const sourcePath = path.resolve(options.sourceDir);

  return file.startsWith(sourcePath) && file.endsWith('.md');
}

function unlinkOutputFile(file, options) {
  const id = path.basename(file).replace(/\.md$/, '');
  const dir = path.dirname(file);
  const type = path.basename(dir);
  const outputPath = path.join(options.outputDir, type);
  const outFile = path.join(outputPath, `${id}.json`);
  if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
}

export function staticJsonApi(options) {
  return {
    name: 'static-json-api',
    buildStart() {
      parseMarkdownFiles(options);
    },
    configureServer(server) {
      server.watcher.on('add', (file) => {
        if (isJsonApiFile(file, options)) {
          parseMarkdownFiles(options);
        }
      });

      server.watcher.on('change', (file) => {
        if (isJsonApiFile(file, options)) {
          parseMarkdownFiles(options);
        }
      });

      server.watcher.on('unlink', (file) => {
        if (isJsonApiFile(file, options)) {
          unlinkOutputFile(file, options);
          parseMarkdownFiles(options);
        }
      });
    },
  };
}
