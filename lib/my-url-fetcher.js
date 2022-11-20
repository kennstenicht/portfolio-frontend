module.exports = async function myUrlFetcher(page, visit) {
  // `visit` is a helper function that accepts a URL/path and will open this page in Puppeteer
  // It returns a promise that resolves when the page finished loading
  await visit('/');

  // `page` is the Puppeteer page instance. You can use all Puppeteer APIs on it
  let urls = await page.$$eval('a', (aTags) =>
    aTags.map((aTag) => aTag.getAttribute('href'))
  );

  await visit('/projects');

  let urls = await page.$$eval('a', (aTags) =>
    aTags.map((aTag) => aTag.getAttribute('href'))
  );

  // Return an array of URLs
  return urls;
};
