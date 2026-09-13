import { viewTransitionName } from '@cardstack/view-transitions';
import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import type { Project } from 'portfolio/data/project';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

interface Signature {
  Element: HTMLDivElement;
  Args: {
    project: Project;
  };
}

const bem = getBem(styles);

export default <template>
  <div class={{bem (hash style=@project.id)}} ...attributes>
    <img
      class={{bem "preview-image" (hash style=@project.id)}}
      src={{@project.previewImage}}
      alt={{@project.title}}
      {{viewTransitionName "project-image-" @project.id}}
    />

    <header class={{bem "header"}}>
      <h1
        class={{bem "title"}}
        {{viewTransitionName "project-title-" @project.id}}
      >
        {{@project.title}}
      </h1>

      <div
        class={{bem "subtitle"}}
        {{viewTransitionName "project-subtitle-" @project.id}}
      >
        {{@project.subtitle}}
      </div>
    </header>
  </div>
</template> satisfies TOC<Signature>;
