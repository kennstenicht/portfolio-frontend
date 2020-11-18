import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
// @ts-ignore
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import { parallel } from 'ember-animated';
// @ts-ignore
import adjustColor from 'ember-animated/motions/adjust-color';
import TransitionContext from 'ember-animated/-private/transition-context';
import SwiperService from 'portfolio/services/swiper';
import ProjectModel from 'portfolio/models/project';

interface Args {
  project: ProjectModel
}

export default class ProjectDetailHeaderComponent extends Component<Args> {
  // Services
  @service swiper!: SwiperService;


  // Defaults
  duration: number = 600;


  // Hooks
  constructor(owner: unknown, args: Args) {
    super(owner, args);

    this.swiper.position = this.args.project.position;
  }


  // Functions
  backgroundTransition = function * ({ sentSprites }: TransitionContext) {
    sentSprites.forEach(sprite => {
      sprite.applyStyles({
        'z-index': '2'
      });
    });

    sentSprites.forEach(parallel(move, resize));
  }

  typoTransition = function * ({ sentSprites }: TransitionContext) {
    sentSprites.forEach(sprite => {
      sprite.applyStyles({
        'z-index': '4'
      });

      parallel(
        move(sprite),
        adjustColor('color', sprite)
      );
    });
  }
}
