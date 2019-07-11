import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { className } from '@ember-decorators/component';

export default class AppLicationComponent extends Component {
  // Services
  @service router;


  // Defaults
  block = 'c-application';


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
