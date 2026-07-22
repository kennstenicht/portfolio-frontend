import { hash } from '@ember/helper';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t } from 'ember-intl';
import onKey from 'ember-keyboard/helpers/on-key';

import wrapperStyles from 'portfolio/assets/styles/objects/wrapper.module.css';
import Metadata from 'portfolio/components/seo/metadata';
import { bem } from 'portfolio/helpers/bem';

import styles from './styles.module.css';

interface Signature {
  Args: {
    model: Error;
  };
}

export default class ErrorTemplate extends Component<Signature> {
  // Services
  @service declare router: RouterService;

  // Defaults
  @tracked isTurningOff = false;

  // Functions
  goToHome = () => {
    this.router.transitionTo('home');
  };

  shutdown = () => {
    this.isTurningOff = true;

    // setTimeout(() => {
    //   this.router.transitionTo('home');
    // }, 700);
  };

  // Template
  <template>
    <Metadata
      @title={{t "route.error.meta.title"}}
      @description={{t "route.error.meta.description"}}
    />

    {{onKey "ctrl+alt+del" this.shutdown}}
    {{onKey "ctrl+alt+Escape" this.shutdown}}
    {{onKey "Enter" this.goToHome}}
    <div class={{bem styles (hash is-turning-off=this.isTurningOff)}}>
      <div class={{bem wrapperStyles (hash size="small" align="center")}}>
        <h1 class={{bem styles "title"}}>{{t "route.error.title"}}</h1>
        {{t "route.error.message" htmlSafe=true}}
      </div>
    </div>
  </template>
}
