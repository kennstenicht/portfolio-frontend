import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from "@ember/service";
import BEM from 'ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  // Services
  router: service(),


  // Class bindings
  classNameBindings: ['currentRouteClass'],
  blockName: 'c-application',

  currentRouteClass: computed('router.currentURL', function() {
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
  })
});
