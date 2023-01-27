import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { hash } from '@ember/helper';
import AnimatedValue from 'ember-animated/components/animated-value';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import { parallel } from 'ember-animated';
import adjustColor from 'ember-animated/motions/adjust-color';
import TransitionContext from 'ember-animated/-private/transition-context';
import SwiperService from 'portfolio/services/swiper';
import ProjectModel from 'portfolio/models/project';
import bem from 'portfolio/helpers/bem';
import styles from './styles.module.css';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    project: ProjectModel;
  }
}

export default class ProjectDetailHeaderComponent extends Component<Signature> {
  // Services
  @service swiper!: SwiperService;

  // Defaults
  duration: number = 600;
  styles = styles;

  // Hooks
  constructor(owner: unknown, args: Signature['Args']) {
    super(owner, args);

    this.swiper.position = this.args.project.position;
  }

  // Functions
  *backgroundTransition({ sentSprites }: TransitionContext) {
    sentSprites.forEach((sprite) => {
      sprite.applyStyles({
        'z-index': '2',
      });
    });

    sentSprites.forEach(parallel(move, resize));
  }

  *typoTransition({ sentSprites }: TransitionContext) {
    sentSprites.forEach((sprite) => {
      sprite.applyStyles({
        'z-index': '4',
      });

      // @ts-ignore
      parallel(move(sprite), adjustColor('color', sprite));
    });
  }

  // Template
  <template>
    <div
      class={{bem this.styles modifiers=(hash style=@project.id)}}
      ...attributes
    >
      <AnimatedValue
        @value={{@project.id}}
        @use={{this.backgroundTransition}}
        @duration={{this.duration}}
        as |id|
      >
        <div
          class={{bem this.styles "background" modifiers=(hash style=id)}}
          style="background-image: url('/assets/projects/{{id}}/{{id}}_preview.jpg')"
        ></div>
      </AnimatedValue>

      <header class={{bem this.styles "header"}}>
        <AnimatedValue
          @value={{@project.title}}
          @use={{this.typoTransition}}
          @duration={{this.duration}}
          as |title|
        >
          <h1 class={{bem this.styles "title"}}>
            {{title}}
          </h1>
        </AnimatedValue>

        <AnimatedValue
          @value={{@project.subtitle}}
          @use={{this.typoTransition}}
          @duration={{this.duration}}
          as |subtitle|
        >
          <div class={{bem this.styles "subtitle"}}>
            {{subtitle}}
          </div>
        </AnimatedValue>
      </header>
    </div>
  </template>
}
