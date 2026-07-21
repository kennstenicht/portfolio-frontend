import { AnimatedOrphans } from 'ember-animated';
import AnimatedTools from 'ember-animated-tools/components/animated-tools';
import HeadLayout from 'ember-cli-head/components/head-layout';

import Application from 'portfolio/components/application';
import ENV from 'portfolio/config/environment';

// @ts-ignore

// @ts-ignore

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
