import { AnimatedOrphans } from 'ember-animated';
import AnimatedTools from 'ember-animated-tools/components/animated-tools';

import Application from 'portfolio/components/application';
import ENV from 'portfolio/config/environment';

const isDevelopment = ENV.environment == 'development';

<template>
  <AnimatedOrphans />
  {{#if isDevelopment}}
    <AnimatedTools @hideUntilKeys="Shift-KeyD" />
  {{/if}}

  <Application>
    {{outlet}}
  </Application>
</template>
