import type { TOC } from '@ember/component/template-only';

import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

export interface ProjectListScrollIndicatorSignature {
  Element: HTMLDivElement;
}

const bem = getBem(styles);

const Chevron: TOC<{ Element: SVGSVGElement }> = <template>
  <svg class={{bem "chevron"}} viewBox="0 0 4 7" shape-rendering="crispEdges">
    <rect x="0" y="0" width="1" height="1" />
    <rect x="1" y="1" width="1" height="1" />
    <rect x="2" y="2" width="1" height="1" />
    <rect x="3" y="3" width="1" height="1" />
    <rect x="2" y="4" width="1" height="1" />
    <rect x="1" y="5" width="1" height="1" />
    <rect x="0" y="6" width="1" height="1" />
  </svg>
</template>;

export default <template>
  <div class={{(bem)}} aria-hidden="true" ...attributes>
    <Chevron />
    <Chevron />
    <Chevron />
  </div>
</template> satisfies TOC<ProjectListScrollIndicatorSignature>;
