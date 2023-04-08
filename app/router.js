import EmberRouter from '@embroider/router';
import config from 'portfolio/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // Pages
  this.route('pages', { path: '/' }, function () {
    this.route('show', { path: ':id' });
    this.route('home', { path: '/' });
  });

  // Projects
  this.route('projects', function () {
    this.route('show', { path: ':id' });
  });

  // Error
  this.route('error', { path: '/*path' });
});
