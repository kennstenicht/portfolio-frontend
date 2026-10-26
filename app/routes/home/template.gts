import { t } from 'ember-intl';

import Intro from 'portfolio/components/intro';
import Metadata from 'portfolio/components/seo/metadata';

<template>
  <Metadata
    @title={{t "route.application.meta.title"}}
    @description={{t "route.application.meta.description"}}
  />

  <Intro />
</template>
