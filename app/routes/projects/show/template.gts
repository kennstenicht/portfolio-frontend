import type { TOC } from '@ember/component/template-only';
import type { ReactiveDataDocument } from '@warp-drive/core/reactive';

import ProjectDetail from 'portfolio/components/project-detail';
import Metadata from 'portfolio/components/seo/metadata';
import type { Project } from 'portfolio/data/project';

interface ProjectsShowRouteSignature {
  Args: {
    model: ReactiveDataDocument<Project>;
  };
}

<template>
  <Metadata
    @title={{@model.data.metaTitle}}
    @description={{@model.data.metaDescription}}
    @type="article"
    @image={{@model.data.previewImage}}
  />

  <ProjectDetail @project={{@model.data}} />
</template> satisfies TOC<ProjectsShowRouteSignature>;
