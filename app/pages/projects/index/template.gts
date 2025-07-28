import type { TOC } from '@ember/component/template-only';
import ProjectList from 'portfolio/components/project-list';
import type ProjectModel from 'portfolio/models/project';

interface ProjectsIndexRouteSignature {
  Args: {
    model: ProjectModel[];
  };
}

<template>
  <ProjectList @projects={{@model}} />
</template> satisfies TOC<ProjectsIndexRouteSignature>;
