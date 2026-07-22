import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

import ProjectList from 'portfolio/components/project-list';
import Metadata from 'portfolio/components/seo/metadata';
import type ProjectModel from 'portfolio/models/project';

interface ProjectsIndexRouteSignature {
  Args: {
    model: ProjectModel[];
  };
}

<template>
  <Metadata
    @title={{t "route.projects.meta.title"}}
    @description={{t "route.projects.meta.description"}}
  />

  <ProjectList @projects={{@model}} />
</template> satisfies TOC<ProjectsIndexRouteSignature>;
