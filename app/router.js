import EmberRouter from '@ember/routing/router';
import config from 'portfolio/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // Pages
  this.route('home', { path: '/' });
  this.route('page', { path: ':page_id' });

  // Projects
  this.route('projects', function () {
    this.route('show', { path: ':id' });
  });

  // Error
  this.route('error', { path: '/*path' });
});
