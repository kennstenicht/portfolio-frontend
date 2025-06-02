const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const chokidar = require('chokidar');

const contentBase = './api';
const outputBase = './public/api';

function generateJsonFiles() {
  // Delete all folders and files
  fs.rmSync(outputBase, { recursive: true, force: true });

  // Search for folders inside contentBase folder
  const dirs = fs.readdirSync(contentBase);

  for (const dir of dirs) {
    const files = fs.readdirSync(path.join(contentBase, dir));

    const records = files.map((filename) => {
      const raw = fs.readFileSync(
        path.join(contentBase, dir, filename),
        'utf8',
      );
      const { data, content } = matter(raw);
      const id = filename.replace(/\.md$/, '');

      return {
        type: dir, // e.g. 'page' from 'pages'
        id,
        attributes: {
          ...data,
          id: id,
          content: marked(content),
        },
      };
    });

    const outputPath = path.join(outputBase, dir);
    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(
      path.join(outputBase, dir, 'all.json'),
      JSON.stringify({ data: records }, null, 2),
    );

    for (const record of records) {
      fs.writeFileSync(
        path.join(outputPath, `${record.id}.json`),
        JSON.stringify({ data: record }, null, 2),
      );
    }

    console.log(`✓ Built ${dir} (${records.length} items) → ${outputPath}`);
  }
}

const watcher = chokidar.watch('./api', {
  ignored: /^\./,
  persistent: true,
});

watcher.on('change', function (path) {
  generateJsonFiles();
});
