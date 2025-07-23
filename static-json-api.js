import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

function parseMarkdownFiles(options) {
  console.log('Generate static JSON:API');
  fs.mkdirSync(options.outputDir, { recursive: true });

  for (const resource of options.resources) {
    const sourcePath = path.join(options.sourceDir, resource.type);
    const files = fs.readdirSync(sourcePath);

    const records = files.map((filename) => {
      const raw = fs.readFileSync(path.join(sourcePath, filename), 'utf8');
      const { data, content } = matter(raw);
      const id = filename.replace(/\.md$/, '');

      return {
        type: resource.type,
        id,
        attributes: {
          ...data,
          content: marked(content),
        },
      };
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
