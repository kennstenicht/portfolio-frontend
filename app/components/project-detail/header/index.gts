import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { animatedValue } from 'ember-animated';
import { parallel } from 'ember-animated';
import TransitionContext from 'ember-animated/-private/transition-context';
import adjustColor from 'ember-animated/motions/adjust-color';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';

import { bem } from 'portfolio/helpers/bem';
import ProjectModel from 'portfolio/models/project';

import styles from './styles.module.css';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    project: ProjectModel;
  };
}

export default class ProjectDetailHeader extends Component<Signature> {
  // Defaults
  duration = 600;
  styles = styles;

  // Functions
  // eslint-disable-next-line require-yield -- ember-animated transition generator that fires motions without awaiting them
  *previewImageTransition({ sentSprites }: TransitionContext) {
    sentSprites.forEach((sprite) => {
      sprite.applyStyles({
        'z-index': '2',
      });
    });

    sentSprites.forEach((sprite) => void parallel(move, resize)(sprite));
  }

  // eslint-disable-next-line require-yield -- ember-animated transition generator that fires motions without awaiting them
  *typoTransition({ sentSprites }: TransitionContext) {
    sentSprites.forEach((sprite) => {
      sprite.applyStyles({
        'z-index': '4',
      });

      // @ts-expect-error -- adjustColor's motion typing does not match the parallel() overload
      parallel(move(sprite), adjustColor('color', sprite));
    });
  }

  // Template
  <template>
    <div class={{bem this.styles (hash style=@project.id)}} ...attributes>
      {{#animatedValue
        @project.previewImage
        use=this.previewImageTransition
        duration=this.duration
        as |previewImage|
      }}
        <img
          class={{bem this.styles "preview-image" (hash style=@project.id)}}
          src={{previewImage}}
          alt={{@project.title}}
        />
      {{/animatedValue}}

      <header class={{bem this.styles "header"}}>
        {{#animatedValue
          @project.title use=this.typoTransition duration=this.duration
          as |title|
        }}
          <h1 class={{bem this.styles "title"}}>
            {{title}}
          </h1>
        {{/animatedValue}}

        {{#animatedValue
          @project.subtitle use=this.typoTransition duration=this.duration
          as |subtitle|
        }}
          <div class={{bem this.styles "subtitle"}}>
            {{subtitle}}
          </div>
        {{/animatedValue}}
      </header>
    </div>
  </template>
}
