import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';
import SetHeadTags from '../mixins/set-head-tags';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default class ApplicationRoute extends Route.extend(ApplicationRouteMixin, SetHeadTags) {
  // Services
  @service session
  @service intl


  // Defaults
  metaTitle = 'A berlin based Front-End Engenieer & UI/UX-Designer | Christoph Wiedenmann';
  metaDescription = 'ag-prop ist ein Berliner Digitalstudio. Für unsere Kunden entwickeln wir digitale Produkte, Services und Kommunikationsstrategien.';
  metaImage = 'images/default_sharing.jpg';


  // Hooks
  beforeModel() {
    // TODO: Add language switch
    this.intl.setLocale('de');
  }
}
