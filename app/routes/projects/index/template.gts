import type { TOC } from '@ember/component/template-only';
import type { ReactiveDataDocument } from '@warp-drive/core/reactive';
import { t } from 'ember-intl';

import ProjectList from 'portfolio/components/project-list';
import Metadata from 'portfolio/components/seo/metadata';
import type { Project } from 'portfolio/data/project';

interface ProjectsIndexRouteSignature {
  Args: {
    model: ReactiveDataDocument<Project[]>;
  };
}

<template>
  <Metadata
    @title={{t "route.projects.meta.title"}}
    @description={{t "route.projects.meta.description"}}
  />

  <ProjectList @projects={{@model.data}} />
</template> satisfies TOC<ProjectsIndexRouteSignature>;
