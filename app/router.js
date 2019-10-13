import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  // Admin and Login
  this.route('admin', function() {
    this.route('projects', function() {
      this.route('edit', { path: ':id' });
      this.route('new');
    });
    this.route('pages', function() {
      this.route('edit', { path: ':id' });
      this.route('new');
    });
  });
  this.route('login');

  // Pages
  this.route('pages', { path: '/' }, function() {
    this.route('show', { path: ':page_slug' });
    this.route('home', { path: '/' });
  });

  // Projects
  this.route('projects', function() {
    this.route('show', { path: ':project_slug' });
  });
});

export default Router;
