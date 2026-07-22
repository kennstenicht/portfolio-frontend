import type { TOC } from '@ember/component/template-only';

import Metadata from 'portfolio/components/seo/metadata';
import type PageModel from 'portfolio/models/page';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

interface PagesShowRouteSignature {
  Args: {
    model: PageModel;
  };
}

const bem = getBem(styles);

<template>
  <Metadata
    @title={{@model.metaTitle}}
    @description={{@model.metaDescription}}
    @type="article"
  />

  <div class={{(bem)}}>
    <div class={{bem "title-wrapper"}}>
      <h1 class={{bem "title"}}>
        {{! template-lint-disable no-triple-curlies }}
        {{{@model.title}}}
      </h1>
    </div>
    <div class={{bem "content"}}>
      {{! template-lint-disable no-triple-curlies }}
      {{{@model.content}}}
    </div>
  </div>
</template> satisfies TOC<PagesShowRouteSignature>;
