import type { TOC } from '@ember/component/template-only';

import wrapperStyles from 'portfolio/assets/styles/objects/wrapper.module.css';
import ProjectModel from 'portfolio/models/project';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    project: ProjectModel;
  };
}

const bem = getBem(styles);
const wrapperBem = getBem(wrapperStyles);

export default <template>
  <div class={{(bem)}} ...attributes>
    <div class={{(wrapperBem)}}>
      {{! template-lint-disable no-bare-strings }}
      <h2>Custom Project Detail Template</h2>
      {{! template-lint-disable no-triple-curlies }}
      {{{@project.content}}}
    </div>
  </div>
</template> satisfies TOC<Signature>;
