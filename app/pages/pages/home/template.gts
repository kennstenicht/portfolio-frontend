import type { TOC } from '@ember/component/template-only';
import Page from 'portfolio/components/page';
import type PageModel from 'portfolio/models/page';

interface HomeRouteSignature {
  Args: {
    model: PageModel;
  };
}

<template>
  <Page @size="small">
    <h1>{{@model.title}}</h1>

    {{! template-lint-disable no-triple-curlies }}
    {{{@model.content}}}
  </Page>
</template> satisfies TOC<HomeRouteSignature>;
