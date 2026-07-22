import type { TOC } from '@ember/component/template-only';

import Metadata from 'portfolio/components/seo/metadata';
import { bem } from 'portfolio/helpers/bem';
import type PageModel from 'portfolio/models/page';

import styles from './styles.module.css';

interface PagesShowRouteSignature {
  Args: {
    model: PageModel;
  };
}

<template>
  <Metadata
    @title={{@model.metaTitle}}
    @description={{@model.metaDescription}}
    @type="article"
  />

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
