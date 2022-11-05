import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { timeout, task } from 'ember-concurrency';
import fade from 'ember-animated/transitions/fade';

export default class AppLicationHeaderComponent extends Component {
  // Services
  @service router;


  // Defaults
  @tracked menuLabel = 'menu';
  fadeTransition=fade;
  numberOfGenerations = 0;


  // Getter and setter
  get isProjectDetail() {
    return this.router.currentRoute.name === "projects.show";
  }


  // Actions
  @action
  toggleNavigation() {
    this.randomString.perform();
    this.args.toggleNavigation();
  }


  // Tasks
  @task({
    restartable: true
  })
  randomString = function* () {
    let possibleLetters = 'abcdefghijklmnopqrstuvwxyz1234567890§$%&?!/()=#';
    let string = '';

    yield timeout(100);

    if (this.numberOfGenerations < 6) {
      this.numberOfGenerations++;

      for (var i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * possibleLetters.length);
        string += possibleLetters.charAt(randomIndex);
      }

      this.randomString.perform();
    } else {
      this.numberOfGenerations = 0;

      string = this.args.isNavigationOpen ? 'close' : 'menu';
    }

    this.menuLabel = string;
  }
}
