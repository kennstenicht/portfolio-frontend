import { LinkTo } from '@ember/routing';
import { hash } from '@ember/helper';
import { helper } from '@ember/component/helper';
import AnimatedValue from 'ember-animated/components/animated-value';
import t from 'ember-intl/helpers/t';
import Header from './header';
import Summary from './summary';
import bem from 'portfolio/helpers/bem';
import styles from './styles.module.css';
import link from 'portfolio/assets/styles/objects/link.module.css';
import AdHoc from './ad-hoc';
import Binuu from './binuu';
import DisasterMgmt from './disaster-mgmt';
import Eels from './eels';
import Flutkoerper from './flutkoerper';

const CONTENT_COMPONENTS = {
  'ad-hoc': AdHoc,
  binuu: Binuu,
  'disaster-mgmt': DisasterMgmt,
  eels: Eels,
  flutkoerper: Flutkoerper,
};

const getContentComponent = helper((project) => {
  return CONTENT_COMPONENTS[project];
});

<template>
  <AnimatedValue @value={{@project}} as |project|>
    <article
      class={{bem styles modifiers=(hash style=project.id)}}
      ...attributes
    >
      <Header @project={{project}} />
      <div class={{bem styles "content"}}>
        <Summary @project={{project}} />
        <div class={{bem styles "wrapper"}}>
          {{#let (getContentComponent project.id) as |ContentComponent|}}
            <ContentComponent @project={{project}} />
          {{/let}}
          <div class={{bem styles "back"}}>
            <LinkTo @route="projects" class={{bem link}}>
              {{t "projectDetail.backToOverview" htmlSafe=true}}
            </LinkTo>
          </div>
        </div>
      </div>
    </article>
  </AnimatedValue>
</template>
