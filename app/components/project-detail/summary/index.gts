import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';

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

export default <template>
  <div class={{bem (hash style=@project.id)}} ...attributes>
    <div class={{bem "excerpt"}}>
      {{! template-lint-disable no-triple-curlies }}
      {{{@project.excerpt}}}
    </div>
    <div class={{bem "meta-info"}}>
      {{! template-lint-disable no-triple-curlies }}
      {{{@project.facts}}}
    </div>
  </div>
</template> satisfies TOC<Signature>;
