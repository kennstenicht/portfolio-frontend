import type { TOC } from '@ember/component/template-only';
import type { ReactiveDataDocument } from '@warp-drive/core/reactive';

import Content from 'portfolio/components/content';
import Metadata from 'portfolio/components/seo/metadata';
import type { Page } from 'portfolio/data/page';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

interface PagesShowRouteSignature {
  Args: {
    model: ReactiveDataDocument<Page>;
  };
}

const bem = getBem(styles);

<template>
  <Metadata
    @title={{@model.data.metaTitle}}
    @description={{@model.data.metaDescription}}
    @type="article"
  />

  <div class={{(bem)}}>
    <div class={{bem "title-wrapper"}}>
      <h1 class={{bem "title"}}>
        {{! template-lint-disable no-triple-curlies }}
        {{{@model.data.title}}}
      </h1>
    </div>
    <Content @html={{@model.data.content}} class={{bem "content"}} />
  </div>
</template> satisfies TOC<PagesShowRouteSignature>;
