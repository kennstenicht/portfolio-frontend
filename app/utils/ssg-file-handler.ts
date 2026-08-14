import type { Context, Handler, NextFn } from '@warp-drive/core/request';

/**
 * During SSG prerender there is no HTTP server, and the renderer's `fetch`
 * cannot parse root-relative URLs (e.g. `/api/projects/index.json`) — it throws
 * "Failed to parse URL". This handler resolves such GET requests from the static
 * files in `public/` during server rendering, mirroring what the `Fetch` handler
 * would return (parsed body + `setResponse`), and short-circuits before `Fetch`.
 *
 * In the browser it is a no-op: the request is passed along to `Fetch`. The
 * `import.meta.env.SSR` guard lets Vite strip the Node-only branch (and its
 * `node:` imports) from the client bundle.
 */
export const SsgFileHandler: Handler = {
  async request<T>(context: Context, next: NextFn<T>) {
    const { url, method } = context.request;

    if (
      import.meta.env.SSR &&
      method === 'GET' &&
      typeof url === 'string' &&
      url.startsWith('/') &&
      !url.startsWith('//')
    ) {
      const { readFile } = await import('node:fs/promises');
      const { join, normalize } = await import('node:path');

      const publicDir = join(process.cwd(), 'public');
      const filePath = normalize(join(publicDir, url.split('?')[0] ?? url));

      // Guard against path traversal outside the public directory.
      if (filePath.startsWith(publicDir)) {
        const text = await readFile(filePath, 'utf-8');
        context.setResponse(
          new Response(text, {
            status: 200,
            headers: { 'content-type': 'application/json' },
          }),
        );
        return JSON.parse(text) as T;
      }
    }

    return next(context.request);
  },
};
