import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import wrapperStyles from 'portfolio/assets/styles/objects/wrapper.module.css';
import ProjectModel from 'portfolio/models/project';
import hydrateContentSliders from 'portfolio/modifiers/hydrate-content-sliders';
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
    <div
      class={{wrapperBem (hash size="small")}}
      {{hydrateContentSliders @project.content}}
    >
      {{! template-lint-disable no-triple-curlies }}
      {{{@project.content}}}
    </div>
  </div>
</template> satisfies TOC<Signature>;
