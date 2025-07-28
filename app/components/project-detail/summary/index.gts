import { hash } from '@ember/helper';
import type { TOC } from '@ember/component/template-only';

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
  <div class={{bem styles (hash style=@project.id)}} ...attributes>
    <div class={{bem styles "excerpt"}}>
      {{! template-lint-disable no-triple-curlies }}
      {{{@project.excerpt}}}
    </div>
    <div class={{bem styles "meta-info"}}>
      {{! template-lint-disable no-triple-curlies }}
      {{{@project.facts}}}
    </div>
  </div>
</template> satisfies TOC<Signature>;
