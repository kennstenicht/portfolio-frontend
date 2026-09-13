import { viewTransitionName } from '@cardstack/view-transitions';
import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import type { Project } from 'portfolio/data/project';
import indexNumber from 'portfolio/helpers/index-number';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

export interface ProjectListPreviewSignature {
  Element: HTMLElement;
  Args: {
    project: Project;
    index: number;
  };
}

const bem = getBem(styles);

export default class ProjectListPreview extends Component<ProjectListPreviewSignature> {
  // Services
  @service declare router: RouterService;

  // Template
  <template>
    <article class={{bem (hash style=@project.id)}} ...attributes>
      <LinkTo @route="projects.show" @model={{@project.id}}>
        <img
          class={{bem "preview-image" (hash style=@project.id)}}
          src={{@project.previewImage}}
          alt={{@project.title}}
          {{viewTransitionName "project-image-" @project.id}}
        />
        <header class={{bem "header"}}>
          <div class={{bem "index"}} data-swiper-parallax="50">
            {{indexNumber @index}}
          </div>

          <h1
            class={{bem "title"}}
            {{viewTransitionName "project-title-" @project.id}}
          >
            {{@project.title}}
          </h1>

          <div
            class={{bem "subtitle"}}
            data-swiper-parallax="90"
            {{viewTransitionName "project-subtitle-" @project.id}}
          >
            {{@project.subtitle}}
          </div>
        </header>

        <div class={{bem "tags"}}>
          {{join @project.tags " & "}}
        </div>
      </LinkTo>
    </article>
  </template>
}

function join(array: unknown[], separator = ' ') {
  return array.filter(Boolean).join(separator);
}
