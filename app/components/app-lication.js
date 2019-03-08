import Component from '@ember/component';
import { className } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import BEM from 'ember-cli-bem/mixins/bem';

export default class AppLicationComponent extends Component.extend(
  BEM
) {
  // Services
  @service router;


  // Defaults
  blockName = 'c-application';


  // Computed Properties
  @className
  @computed('router.currentURL')
  get currentRouteClass() {
    let routeSegments = this.router.currentURL.substring(1).split('/');
    let routeName = this.router.currentRouteName.replace('.', '-');
    let blockName = this.blockName;
    let classes = new Array();

    routeSegments.forEach(function (segement) {
      if(segement) {
        classes.push(blockName + '--' + segement);
      } else {
        classes.push(blockName + '--home');
      }
    });

    if(classes.indexOf(blockName + '--' + routeName) == -1) {
      classes.push(blockName + '--' + routeName);
    }

    return classes.join(' ');
  }
}
