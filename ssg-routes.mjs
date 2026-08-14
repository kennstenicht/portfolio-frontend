import { readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function contentRouteIds(dir) {
  const path = join(__dirname, 'content', dir);
  try {
    return readdirSync(path)
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

const staticRoutes = ['index'];

const dynamicRoutes = [
  // Content pages mounted at the top level (/:page_id): about, imprint, privacy
  ...contentRouteIds('pages'),

  // Projects index + detail pages
  'projects',
  ...contentRouteIds('projects').map((id) => `projects/${id}`),
];

export const routes = [...staticRoutes, ...dynamicRoutes];
