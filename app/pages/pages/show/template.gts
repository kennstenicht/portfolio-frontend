import Page from 'portfolio/components/page';

<template>
  <Page>
    <h1>{{@model.title}}</h1>

    {{! template-lint-disable no-triple-curlies }}
    {{{@model.content}}}
  </Page>
</template>
