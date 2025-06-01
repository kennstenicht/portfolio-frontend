import Page from 'portfolio/components/page';

<template>
  {{! template-lint-disable no-bare-strings }}
  <Page @style={{@model.id}}>
    <h1>{{@model.title}}</h1>

    {{! template-lint-disable no-triple-curlies }}
    {{{@model.html}}}
  </Page>
</template>
