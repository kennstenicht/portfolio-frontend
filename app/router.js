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
    this.route('login');
  });

  this.route('home', { path: '/' });
  this.route('projects', function() {
    this.route('show', { path: ':project_slug' });
  });
  this.route('imprint');
  this.route('about');
});

export default Router;
