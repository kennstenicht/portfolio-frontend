import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import { TweenLite, Power1 } from 'gsap/TweenMax';
import styles from './styles.module.css';
import bem from 'portfolio/helpers/bem';

export default class AppLicationLogoComponent extends Component {
  // Defaults
  element: HTMLElement;
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
    'No border, No nation',
    'Make Code not  war  ',
    '01100011    01110111',
    'Rescue is not acrime',
  ];


  // Getter and setter
  get defaultLetters() {
    return this.words[0].split('');
  }


  // Functions
  randomBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
  }

  @action
  setElement(element) {
    this.element = element;
  }

  @action
  explode() {
    const letters = this.element
      .querySelectorAll('[data-selector=letter]');
    const newWord = this.words[this.randomBetween(1, this.words.length-1)]
      .split('');

    letters.forEach(function (letter, index) {
      const newLetter = newWord[index];

      TweenLite.to(
        letter,
        0.3,
        {
          css: {
            left: this.randomBetween(-100,100) + 'px',
            top: this.randomBetween(-100,100) + 'px'
          },
          onComplete: this.implode,
          onCompleteParams: [letter, newLetter],
          ease: Power1.easeOut
        },
      );
    }, this);
  }

  implode(letter, newLetter) {
    letter.innerHTML = newLetter;

    TweenLite.to(
      letter,
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


  // Template
  <template>
    <div
      class={{bem styles}}
      role="button"
      {{didInsert this.setElement}}
      {{on "mouseenter" this.explode}}
      ...attributes
    >
      {{#each this.defaultLetters as |letter|}}
        <span class={{bem styles "letter"}} data-selector="letter">
          {{letter}}
        </span>
      {{/each}}
    </div>
  </template>
}
