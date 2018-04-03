import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import ScrollControllerRouteMixin from 'ember-scrollmagic/mixins/scroll-controllers/route-mixin';
import SetHeadTags from '../mixins/set-head-tags';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, ScrollControllerRouteMixin, SetHeadTags, {
  // Services
  session: service(),
  intl: service(),

  // Variables
  metaTitle: 'A berlin based Front-End Engenieer & UI/UX-Designer | Christoph Wiedenmann',
  metaDescription: 'ag-prop ist ein Berliner Digitalstudio. Für unsere Kunden entwickeln wir digitale Produkte, Services und Kommunikationsstrategien.',
  metaImage: 'images/default_sharing.jpg',

  beforeModel() {
    // TODO: Add language switch
    get(this, 'intl').setLocale('de');
  }
});
