import type { TOC } from '@ember/component/template-only';

import { bem } from 'portfolio/helpers/bem';
import type PageModel from 'portfolio/models/page';

import styles from './styles.module.css';
import fitText from 'portfolio/modifiers/fit-text';

interface HomeRouteSignature {
  Args: {
    model: PageModel;
  };
}

<template>
  <div class={{bem styles}} {{fitText}} ...attributes>
    {{! template-lint-disable no-triple-curlies }}
    <h1 class={{bem styles "title"}}>{{{@model.title}}}</h1>,
    {{! template-lint-disable no-triple-curlies }}
    {{{@model.content}}}
  </div>
</template> satisfies TOC<HomeRouteSignature>;
