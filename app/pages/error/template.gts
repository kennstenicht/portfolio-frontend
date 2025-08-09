import { hash } from '@ember/helper';

import wrapperStyles from 'portfolio/assets/styles/objects/wrapper.module.css';
import { bem } from 'portfolio/helpers/bem';

import styles from './styles.module.css';

<template>
  <div class={{bem styles}}>
    <div class={{bem wrapperStyles (hash size="small" align="center")}}>
      <h1>404 - Not Found</h1>
      A fatal exception 404 has occurred at C0DE:ABAD1DEA in 0xC0DEBA5E. The
      current request will be terminated.<br />
      <br />
      * Press the return key to return to the previous page.<br />
      * Press CTRL+ALT+DEL to restart your computer. You will lose any unsaved
      information in all applications.<br />
      <br />
      Press any key to continue...█
    </div>
  </div>
</template>
