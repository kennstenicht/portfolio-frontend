import { hash } from '@ember/helper';
import bem from 'portfolio/helpers/bem';
import styles from './styles.module.css';

<template>
  <div
    class={{bem styles modifiers=(hash
      size=@size
    )}}
    ...attributes
  >
    <div class={{bem styles "wrapper"}}>
      {{yield @model}}
    </div>
  </div>
</template>
