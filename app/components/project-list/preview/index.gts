import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import RouterService from '@ember/routing/router-service';
import AnimatedValue from 'ember-animated/components/animated-value';
import { parallel } from 'ember-animated';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import adjustColor from 'ember-animated/motions/adjust-color';
import TransitionContext from 'ember-animated/-private/transition-context';
import { indexNumber } from 'portfolio/helpers/index-number';
import bem from 'portfolio/helpers/bem';
import styles from './styles.module.css';
import Project from 'portfolio/models/project';

interface Signature {
  Element: HTMLElement;
  Args: {
    project: Project;
    index: number;
  };
}

export default class ProjectListPreviewComponent extends Component<Signature> {
  // Services
  @service declare router: RouterService;

  // Defaults
  duration = 600;

  // Functions
  *backgroundTransition({ sentSprites }: TransitionContext) {
    sentSprites.forEach((sprite) => {
      sprite.applyStyles({
        'z-index': '3',
      });
    });

    sentSprites.forEach(parallel(move, resize));
  }

  *typoTransition({ sentSprites }: TransitionContext) {
    sentSprites.forEach((sprite) => {
      sprite.applyStyles({
        'z-index': '4',
      });

      parallel(move(sprite), adjustColor('color', sprite));
    });
  }

  // Template
  <template>
    <article
      class={{bem styles modifiers=(hash style=@project.id)}}
      ...attributes
    >
      <LinkTo @route="projects.show" @model={{@project}}>
        <AnimatedValue
          @value={{@project.id}}
          @use={{this.backgroundTransition}}
          @duration={{this.duration}}
          as |id|
        >
          <div
            class={{bem styles "background" modifiers=(hash style=id)}}
            style="background-image: url('/assets/projects/{{id}}/{{id}}_preview.jpg')"
          ></div>
        </AnimatedValue>

        <header class={{bem styles "header"}}>
          <div class={{bem styles "index" data-swiper-parallax="50"}}>
            {{indexNumber @index}}
          </div>

          <AnimatedValue
            @value={{@project.title}}
            @use={{this.typoTransition}}
            @duration={{this.duration}}
            as |title|
          >
            <h1 class={{bem styles "title"}}>
              {{title}}
            </h1>
          </AnimatedValue>

          <AnimatedValue
            @value={{@project.subtitle}}
            @use={{this.typoTransition}}
            @duration={{this.duration}}
            as |subtitle|
          >
            <div class={{bem styles "subtitle" data-swiper-parallax="90"}}>
              {{subtitle}}
            </div>
          </AnimatedValue>
        </header>

        <div class={{bem styles "meta"}}>
          {{! template-lint-disable no-bare-strings }}
          Concept & Development
        </div>
      </LinkTo>
    </article>
  </template>
}
