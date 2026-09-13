import type { TOC } from '@ember/component/template-only';
import { htmlSafe } from '@ember/template';

import contentStyles from 'portfolio/assets/styles/objects/content.module.css';
import { getBem } from 'portfolio/utils/get-bem';

export interface ContentSignature {
  Element: HTMLDivElement;
  Args: {
    html: string;
  };
}

const bem = getBem(contentStyles);

export default <template>
  <div class={{(bem)}} ...attributes>
    {{htmlSafe @html}}
  </div>
</template> satisfies TOC<ContentSignature>;
