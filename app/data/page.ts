import { withDefaults } from '@warp-drive/core/reactive';
import { withReactiveResponse } from '@warp-drive/core/request';
import type { Type } from '@warp-drive/core/types/symbols';

export interface Page {
  id: string;
  $type: 'page';
  content: string;
  metaDescription: string;
  metaTitle: string;
  title: string;
  [Type]: 'page';
}

export const PageSchema = withDefaults({
  type: 'page',
  fields: [
    { name: 'content', kind: 'field' },
    { name: 'metaDescription', kind: 'field' },
    { name: 'metaTitle', kind: 'field' },
    { name: 'title', kind: 'field' },
  ],
});

export function getPage(page_id: string) {
  return withReactiveResponse<Page>({
    url: `/api/pages/${page_id}.json`,
    method: 'GET',
  });
}
