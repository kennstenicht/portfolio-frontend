import type { TOC } from '@ember/component/template-only';

import wrapperStyles from 'portfolio/assets/styles/objects/wrapper.module.css';
import { bem } from 'portfolio/helpers/bem';
import ProjectModel from 'portfolio/models/project';

import styles from './styles.module.css';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    project: ProjectModel;
  };
}

export default <template>
  <div class={{bem styles}} ...attributes>
    <div class={{bem wrapperStyles}}>
      {{! template-lint-disable no-triple-curlies }}
      {{{@project.content}}}
    </div>
  </div>
</template> satisfies TOC<Signature>;
