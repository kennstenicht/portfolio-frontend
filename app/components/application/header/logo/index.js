import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TweenLite, Power1 } from 'gsap/TweenMax';
import styles from './styles.module.css';

export default class AppLicationLogoComponent extends Component {
  // Defaults
  styles = styles;
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
    return this.words.objectAt(0).split('');
  }


  // Functions
  randomBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
  }


  // Actions
  @action
  setElement(element) {
    this.element = element;
  }

  @action
  explode() {
    const letters = this.element
      .querySelectorAll('[data-selector=letter]');
    const newWord = this.words
      .objectAt(this.randomBetween(1, this.words.length-1))
      .split('');

    letters.forEach(function (letter, index) {
      const newLetter = newWord.objectAt(index);

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
}
