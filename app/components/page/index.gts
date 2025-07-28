import { hash } from '@ember/helper';
import type { TOC } from '@ember/component/template-only';

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

export default <template>
  <div class={{bem styles (hash size=@size)}} ...attributes>
    <div class={{bem styles "wrapper"}}>
      {{yield}}
    </div>
  </div>
</template> satisfies TOC<Signature>;
