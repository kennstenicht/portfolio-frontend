import type { TOC } from '@ember/component/template-only';
import ProjectDetail from 'portfolio/components/project-detail';
import type ProjectModel from 'portfolio/models/project';

interface ProjectsShowRouteSignature {
  Args: {
    model: ProjectModel;
  };
}

<template>
  <ProjectDetail @project={{@model}} />
</template> satisfies TOC<ProjectsShowRouteSignature>;
