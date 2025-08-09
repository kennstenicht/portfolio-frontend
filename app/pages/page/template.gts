import type { TOC } from '@ember/component/template-only';

import type PageModel from 'portfolio/models/page';
import { bem } from 'portfolio/helpers/bem';

import styles from './styles.module.css';

interface PagesShowRouteSignature {
  Args: {
    model: PageModel;
  };
}

<template>
  <div class={{bem styles}}>
    <div class={{bem styles "title-wrapper"}}>
      <h1 class={{bem styles "title"}}>
        {{! template-lint-disable no-triple-curlies }}
        {{{@model.title}}}
      </h1>
    </div>
    <div class={{bem styles "content"}}>
      {{! template-lint-disable no-triple-curlies }}
      {{{@model.content}}}
    </div>
  </div>
</template> satisfies TOC<PagesShowRouteSignature>;
