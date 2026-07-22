import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import {
  type TransitionContext,
  animatedValue,
  parallel,
} from 'ember-animated';
import adjustColor from 'ember-animated/motions/adjust-color';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';

import { bem } from 'portfolio/helpers/bem';
import indexNumber from 'portfolio/helpers/index-number';
import Project from 'portfolio/models/project';

import styles from './styles.module.css';

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
  // eslint-disable-next-line require-yield
  *backgroundTransition({ sentSprites }: TransitionContext) {
    sentSprites.forEach((sprite) => {
      sprite.applyStyles({
        'z-index': '3',
      });

      void parallel(move, resize)(sprite);
    });
  }

  // eslint-disable-next-line require-yield
  *typoTransition({ sentSprites }: TransitionContext) {
    sentSprites.forEach((sprite) => {
      sprite.applyStyles({
        'z-index': '4',
      });

      void parallel(move, () => adjustColor('color', sprite))(sprite);
    });
  }

  // Template
  <template>
    <article class={{bem styles (hash style=@project.id)}} ...attributes>
      <LinkTo @route="projects.show" @model={{@project}}>
        {{#animatedValue
          @project.previewImage
          use=this.backgroundTransition
          duration=this.duration
          as |previewImage|
        }}
          <img
            class={{bem styles "preview-image" (hash style=@project.id)}}
            src={{previewImage}}
            alt={{@project.title}}
          />
        {{/animatedValue}}
        <header class={{bem styles "header"}}>
          <div class={{bem styles "index"}} data-swiper-parallax="50">
            {{indexNumber @index}}
          </div>

          {{#animatedValue
            @project.title use=this.typoTransition duration=this.duration
            as |title|
          }}
            <h1 class={{bem styles "title"}}>
              {{title}}
            </h1>
          {{/animatedValue}}

          {{#animatedValue
            @project.subtitle use=this.typoTransition duration=this.duration
            as |subtitle|
          }}
            <div class={{bem styles "subtitle"}} data-swiper-parallax="90">
              {{subtitle}}
            </div>
          {{/animatedValue}}
        </header>

        <div class={{bem styles "tags"}}>
          {{join @project.tags " & "}}
        </div>
      </LinkTo>
    </article>
  </template>
}

function join(array: unknown[], separator = ' ') {
  return array.filter(Boolean).join(separator);
}
