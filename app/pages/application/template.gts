// @ts-ignore
import HeadLayout from 'ember-cli-head/components/head-layout';
import { AnimatedOrphans } from 'ember-animated';
// @ts-ignore
import AnimatedTools from 'ember-animated-tools/components/animated-tools';

import Application from 'portfolio/components/application';
import ENV from 'portfolio/config/environment';

const isDevelopment = ENV.environment == 'development';

<template>
  <HeadLayout />
  <AnimatedOrphans />
  {{#if isDevelopment}}
    <AnimatedTools @hideUntilKeys="Shift-KeyD" />
  {{/if}}

  <Application>
    {{outlet}}
  </Application>
</template>
