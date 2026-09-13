import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import type { Project } from 'portfolio/data/project';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

export interface ProjectDetailSummarySignature {
  Element: HTMLDivElement;
  Args: {
    project: Project;
  };
}

const bem = getBem(styles);

export default <template>
  <div class={{bem (hash style=@project.id)}} ...attributes>
    <div class={{bem "excerpt"}}>
      {{! template-lint-disable no-triple-curlies }}
      {{{@project.excerpt}}}
    </div>
    <dl class={{bem "meta-info"}}>
      {{#each-in @project.facts as |label value|}}
        <dt>{{label}}</dt>
        <dd>{{value}}</dd>
      {{/each-in}}
    </dl>
  </div>
</template> satisfies TOC<ProjectDetailSummarySignature>;
