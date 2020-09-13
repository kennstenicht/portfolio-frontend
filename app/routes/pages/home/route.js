import Route from '@ember/routing/route';

export default class PagesHomeRoute extends Route {
  // Hooks
  model() {
    return this.store.query('page', {
        filter: {
          slug: 'home'
        }
      })
      .then((pages) => {
        return pages.get('firstObject');
      });
  }

  serialize(model){
    return {
      page_slug: model.slug
    };
  }
}
