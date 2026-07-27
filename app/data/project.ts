import { withDefaults } from '@warp-drive/core/reactive';
import { withReactiveResponse } from '@warp-drive/core/request';
import type { Type } from '@warp-drive/core/types/symbols';

export interface Project {
  id: string;
  $type: 'project';
  content: string;
  excerpt: string;
  facts: string;
  metaDescription: string;
  metaTitle: string;
  position: number;
  previewImage: string;
  subtitle: string;
  tags: string[];
  title: string;
  visible: boolean;
  [Type]: 'project';
}

export const ProjectSchema = withDefaults({
  type: 'project',
  fields: [
    { name: 'content', kind: 'field' },
    { name: 'excerpt', kind: 'field' },
    { name: 'facts', kind: 'field' },
    { name: 'metaDescription', kind: 'field' },
    { name: 'metaTitle', kind: 'field' },
    { name: 'position', kind: 'field' },
    { name: 'previewImage', kind: 'field' },
    { name: 'subtitle', kind: 'field' },
    { name: 'tags', kind: 'field' },
    { name: 'title', kind: 'field' },
    { name: 'visible', kind: 'field' },
  ],
});

export function getProjects() {
  return withReactiveResponse<Project[]>({
    url: '/api/projects/index.json',
    method: 'GET',
  });
}

export function getProject(project_id: string) {
  return withReactiveResponse<Project>({
    url: `/api/projects/${project_id}.json`,
    method: 'GET',
  });
}
