import type { TOC } from '@ember/component/template-only';
import Page from 'portfolio/components/page';
import type PageModel from 'portfolio/models/page';

interface HomeRouteSignature {
  Args: {
    model: PageModel;
  };
}

<template>
  <Page @wrapperSize="small">
    <:title>
      {{@model.title}}
    </:title>
    <:content>
      {{! template-lint-disable no-triple-curlies }}
      {{{@model.content}}}
    </:content>
  </Page>
</template> satisfies TOC<HomeRouteSignature>;
