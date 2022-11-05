/* eslint-env node */
'use strict';
const StaticSiteJson = require('broccoli-static-site-json');
const MergeTrees = require('broccoli-merge-trees');

const pageJson = new StaticSiteJson('api/pages', {
  type: 'page',
  attributes: [
    'date',
    'meta_description',
    'meta_title',
    'title',
  ],
  contentTypes: ['content', 'html', 'description'],
  contentFolder: 'api/pages',
  collate: true,
  paginate: true,
  paginateSortFunction(a, b) {
    return b.date - a.date;
  }
});


const projectJson = new StaticSiteJson('api/projects', {
  type: 'project',
  attributes: [
    'date',
    'excerpt',
    'facts',
    'meta_description',
    'meta_title',
    'position',
    'subtitle',
    'title',
    'visible',
  ],
  contentTypes: ['content', 'html', 'description'],
  contentFolder: 'api/projects',
  collate: true,
  paginate: true,
  paginateSortFunction(a, b) {
    return b.position - a.position;
  }
});

module.exports = {
  name: 'content-generator',

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    return MergeTrees([pageJson, projectJson]);
  }
};
