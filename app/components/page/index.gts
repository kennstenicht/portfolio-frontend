import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { bem } from 'portfolio/helpers/bem';
import styles from './styles.module.css';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    size?: 'small' | 'full';
  };
  Blocks: {
    default: [];
  };
}

export default class PageComponent extends Component<Signature> {
  <template>
    <div class={{bem styles (hash size=@size)}} ...attributes>
      <div class={{bem styles "wrapper"}}>
        {{yield}}
      </div>
    </div>
  </template>
}
