import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type IntlService from 'ember-intl/services/intl';

import config from 'portfolio/config/environment';

const TITLE_SEPARATOR = ' | ';
const DEFAULT_IMAGE = '/assets/meta/sharing-image--default.jpg';

function headElement(): Element {
  return document.head;
}

interface Tag {
  property?: string;
  name?: string;
  content?: string;
}

interface MetadataSignature {
  Args: {
    title: string;
    description?: string;
    type?: string;
    image?: string;
  };
}

export default class Metadata extends Component<MetadataSignature> {
  @service declare router: RouterService;
  @service declare intl: IntlService;

  // Read lazily: the meta-loaded config is not populated at module-eval time.
  get siteName(): string {
    return config.siteName;
  }

  get type(): string {
    return this.args.type ?? 'website';
  }

  // Open Graph wants language_TERRITORY (de_DE); ember-intl uses BCP 47 (de-de).
  get locale(): string {
    const locale = this.intl.primaryLocale ?? 'en';
    const [language, region] = locale.split('-');
    return region
      ? `${language}_${region.toUpperCase()}`
      : (language ?? locale);
  }

  get url(): string {
    return `${config.host}${this.router.currentURL ?? '/'}`;
  }

  get imageUrl(): string {
    const image = this.args.image ?? DEFAULT_IMAGE;

    return image.startsWith('http') ? image : `${config.host}${image}`;
  }

  // The brand renders lowercase throughout, including the browser-tab title.
  get title(): string {
    return this.args.title.toLowerCase();
  }

  get documentTitle(): string {
    return this.args.title === this.siteName
      ? this.siteName
      : `${this.title}${TITLE_SEPARATOR}${this.siteName}`;
  }

  get tags(): Tag[] {
    const description = this.args.description?.toLowerCase();
    const title = this.title;

    return [
      { name: 'description', content: description },
      { property: 'og:site_name', content: this.siteName },
      { property: 'og:locale', content: this.locale },
      { property: 'og:type', content: this.type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: this.url },
      { property: 'og:image', content: this.imageUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: this.imageUrl },
    ].filter((tag) => tag.content);
  }

  <template>
    {{! template-lint-disable no-forbidden-elements }}
    {{#in-element (headElement) insertBefore=null}}
      <title>{{this.documentTitle}}</title>

      {{#each this.tags as |tag|}}
        <meta
          {{! @glint-expect-error: OG "property" is valid HTML (RDFa) but absent from the DOM element typings }}
          property={{tag.property}}
          name={{tag.name}}
          content={{tag.content}}
        />
      {{/each}}
    {{/in-element}}
  </template>
}
