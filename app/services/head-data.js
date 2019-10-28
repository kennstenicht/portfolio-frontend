import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HeadDataService extends Service {
  // Services
  @service router;


  // Defaults
  @tracked title;
  @tracked description;
  @tracked image;
  @tracked type;
  @tracked url;
  @tracked locale = 'de';

  routeMetaTags = {};
  defaultMetaTags = {
    title: 'christoph wiedenmann » berlin based web engenieer & ux designer',
    description: 'i’m a berlin base web engenieer with a strong ux background and a love for details. i worked with many frameworks in different languages, but i prefer to work with ember.js or ruby on rails.',
    image: 'images/meta/sharing-image--default.jpg',
    type: 'website',
  };


  // Hooks
  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this._setMetaTags);
  }


  // Actions
  @action
  _setMetaTags(transition) {
    const metaTags = {...this.defaultMetaTags, ...this.routeMetaTags};

    this.title = metaTags.title;
    this.description = metaTags.description;
    this.image = metaTags.image;
    this.type = metaTags;

    // Set url to intent url
    this.url = transition.intent.url;

    // Reset routeMetaTags to get defaultMetaTags if route did't set metaTags
    this.routeMetaTags = {};
  }
}
