import { hash } from '@ember/helper';
import bem from 'portfolio/helpers/bem';
import styles from './styles.module.css';

<template>
  <div class={{bem styles modifiers=(hash style=@project.id)}} ...attributes>
    <div class={{bem styles "excerpt"}}>
      {{@project.excerpt}}
    </div>
    <div class={{bem styles "meta-info"}}>
      {{@project.facts}}
    </div>
  </div>
</template>
