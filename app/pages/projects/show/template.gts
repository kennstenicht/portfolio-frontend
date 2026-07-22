import type { TOC } from '@ember/component/template-only';

import ProjectDetail from 'portfolio/components/project-detail';
import Metadata from 'portfolio/components/seo/metadata';
import type ProjectModel from 'portfolio/models/project';

interface ProjectsShowRouteSignature {
  Args: {
    model: ProjectModel;
  };
}

<template>
  <Metadata
    @title={{@model.metaTitle}}
    @description={{@model.metaDescription}}
    @type="article"
    @image={{@model.previewImage}}
  />

  <ProjectDetail @project={{@model}} />
</template> satisfies TOC<ProjectsShowRouteSignature>;
