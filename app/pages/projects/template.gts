import Page from 'portfolio/components/page';

<template>
  <Page @size="full" @style="projects">
    {{outlet}}
  </Page>
</template>
