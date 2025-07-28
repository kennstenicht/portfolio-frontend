import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { gsap } from 'gsap';

import { bem } from 'portfolio/helpers/bem';

import styles from './styles.module.css';

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function implode(letterElement: Element, newLetter: string) {
  letterElement.innerHTML = newLetter;

  gsap.to(letterElement, {
    css: {
      left: '0px',
      top: '0px',
    },
    duration: 0.3,
    ease: 'power1.in',
  });
}

interface Signature {
  Element: HTMLDivElement;
}

export default class ApplicationLogoComponent extends Component<Signature> {
  // Defaults
  declare element: HTMLElement;
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
    return this.words[0]?.split('');
  }

  // Functions
  explode = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const letters = element.querySelectorAll(`.${bem(styles, 'letter')}`);
    const randomWord = this.words[randomBetween(1, this.words.length - 1)];
    const newWord = randomWord?.split('');

    letters.forEach(function (letterElement, index) {
      const newLetter = newWord?.[index];

      gsap.to(letterElement, {
        css: {
          left: randomBetween(-100, 100) + 'px',
          top: randomBetween(-100, 100) + 'px',
        },
        duration: 0.3,
        onComplete: implode,
        onCompleteParams: [letterElement, newLetter],
        ease: 'power1.out',
      });
    });
  };

  // Template
  <template>
    <div
      class={{bem styles}}
      role="button"
      {{on "mouseenter" this.explode}}
      ...attributes
    >
      {{#each this.defaultLetters as |letter|}}
        <span class={{bem styles "letter"}}>
          {{letter}}
        </span>
      {{/each}}
    </div>
  </template>
}
