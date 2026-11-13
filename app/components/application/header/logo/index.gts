import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { gsap } from 'gsap';

import { getBem } from 'portfolio/utils/get-bem';

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

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i] as T;

    result[i] = result[j] as T;
    result[j] = temp;
  }

  return result;
}

export const WORDS = [
  'Christoph Wiedenmann',
  'Handcrafted with ♥♥♥',
  'TypeScript Developer',
  'Experience Designer ',
  'Frontend  Engineer  ',
  'Stylesheet Architect',
  'moin  moinBer-   lin',
  'Fine arts.Fine code.',
  '1000101101 sommelier',
  'Buildcode not  walls',
  'Pushing boundaries  ',
  'creative  </>  coder',
  'embereño  at   heart',
  'open source lover ♥♥',
  'master of disaster  ',
  'fusion of design&dev',
  '01100011    01110111',
  'Rescue is not acrime',
  'Lead dev   @ag—prop ',
  'a11y is   not  extra',
  '404  titlenot  found',
  'Pixelperfect   (ish)',
];

export interface ApplicationHeaderLogoSignature {
  Element: HTMLDivElement;
}

const bem = getBem(styles);

export default class ApplicationHeaderLogo extends Component<ApplicationHeaderLogoSignature> {
  #queue: string[] = [];
  #currentWord = WORDS[0];

  // Default word
  get defaultLetters() {
    return WORDS[0]?.split('');
  }

  #nextWord() {
    if (this.#queue.length === 0) {
      this.#queue = shuffle(WORDS.slice(1));

      // Avoid a repeat across the boundary between two shuffled rounds
      if (this.#queue[0] === this.#currentWord) {
        this.#queue.push(this.#queue.shift() as string);
      }
    }

    this.#currentWord = this.#queue.shift();

    return this.#currentWord;
  }

  // Explode animation
  explode = (event: PointerEvent) => {
    const trigger =
      event.pointerType === 'mouse' ? 'pointerenter' : 'pointerup';

    if (event.type !== trigger) {
      return;
    }

    const element = event.currentTarget as HTMLElement;
    const letters = element.querySelectorAll(`.${bem('letter')}`);
    const newWord = this.#nextWord()?.split('');

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
      class={{(bem)}}
      data-test-logo
      {{on "pointerenter" this.explode}}
      {{on "pointerup" this.explode}}
      ...attributes
    >
      {{#each this.defaultLetters as |letter|}}
        <span class={{bem "letter"}} data-test-logo-letter>
          {{letter}}
        </span>
      {{/each}}
    </div>
  </template>
}
