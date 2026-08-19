import { pluralize } from '@warp-drive/utilities/string';
import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';

function parseMarkdownFiles(options) {
  console.log('Generate static JSON:API');
  fs.mkdirSync(options.outputDir, { recursive: true });

  for (const resource of options.resources) {
    const contentAttribute = resource.contentAttribute;
    const sourcePath = path.join(options.sourceDir, pluralize(resource.type));

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

    const outputPath = path.join(options.outputDir, pluralize(resource.type));
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

function serveNotFound(server, options) {
  const apiRoot = path.resolve(options.outputDir);
  const urlPrefix = `/${path
    .relative(server.config.publicDir, apiRoot)
    .split(path.sep)
    .join('/')}/`;

  server.middlewares.use((request, response, next) => {
    const url = (request.url ?? '').split('?')[0] ?? '';

    if (!url.startsWith(urlPrefix)) {
      return next();
    }

    const filePath = path.join(
      apiRoot,
      decodeURIComponent(url.slice(urlPrefix.length)),
    );

    if (filePath.startsWith(apiRoot) && fs.existsSync(filePath)) {
      return next();
    }

    response.statusCode = 404;
    response.setHeader('content-type', 'application/json');
    response.end(
      JSON.stringify({
        errors: [{ status: '404', title: 'Not Found', detail: url }],
      }),
    );
  });
}

export function staticJsonApi(options) {
  return {
    name: 'static-json-api',
    buildStart() {
      parseMarkdownFiles(options);
    },
    configureServer(server) {
      serveNotFound(server, options);

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
