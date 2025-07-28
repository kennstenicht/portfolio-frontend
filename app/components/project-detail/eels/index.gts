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
  {{! template-lint-disable no-bare-strings }}
  <div class={{bem styles}} ...attributes>
    {{! template-lint-disable no-triple-curlies }}
    {{{@project.content}}}
    <h2>Projekt Beschreibung</h2>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
    /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
    /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
    /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
    /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
    /><br /><br /><br /><br />
    <h2>Projekt Beschreibung</h2>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
    /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
    /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
    /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <h1>Test Ende</h1>
    <br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template> satisfies TOC<Signature>;
