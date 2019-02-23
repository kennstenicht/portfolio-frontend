import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import BEM from 'ember-cli-bem/mixins/bem';
import { TweenLite, Power1 } from 'gsap/TweenLite';

export default class AppLicationLogoComponent extends Component.extend(
  BEM
) {
  // Defaults
  blockName = 'c-application-logo';
  words = [
    'Christoph Wiedenmann',
    'Handcrafted with ♥♥♥',
    'Javascript Developer',
    'Experience Designer ',
    'Frontend  Engineer  ',
    'Stylesheet Architect',
    'Interactive Concepts',
    'Addicted to Ember.js',
    'Basedin   Neu- kölln',
    '1000101101 sommelier',
    'Buildcode not  walls',
    'Pushing boundaries  ',
    'Backend Developer   ',
    'Digital Craftsman   ',
    'Open ··¦··mindedness',
    'working atag—prop   ',
    'creative  </>  coder',
    'embereño  from heart',
    'open source lover ♥♥',
    'master  ofdisaster  ',
    'fusion of design&dev',
    'Progressive WebApps ',
    'No border, No nation'
  ];


  // Computed properties
  @computed
  get defaultWord() {
    return this.words.objectAt(0).split('');
  }


  // Events
  mouseEnter() {
    this.explode();
  }


  // Functions
  random(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
  }

  explode() {
    const letters = this.element.querySelectorAll('.' + this.blockName + "__letter");
    const newWord = this.words.objectAt(this.random(1, this.words.length)).split('');

    letters.forEach(function (element, index) {
      const newLetter = newWord.objectAt(index);

      TweenLite.to(
        element,
        0.3,
        {
          css: {
            left: this.random(-100,100) + 'px',
            top: this.random(-100,100) + 'px'
          },
          onComplete: this.implode,
          onCompleteParams: [element, newLetter],
          ease: Power1.easeOut
        },
      );
    }, this);
  }

  implode(element, newLetter) {
    element.innerHTML = newLetter;

    TweenLite.to(
      element,
      0.3,
      {
        css: {
          left: '0px',
          top: '0px'
        },
        ease: Power1.easeIn
      }
    );
  }
}
