/**
 * Catch-all for ember-data.
 */
export default interface ModelRegistry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- catch-all registry for ember-data model lookups
  [key: string]: any;
}
