import { JSONAPICache } from '@warp-drive/json-api';
import { useLegacyStore } from '@warp-drive/legacy';

import { PageSchema } from 'portfolio/data/page';
import { ProjectSchema } from 'portfolio/data/project';

const Store = useLegacyStore({
  linksMode: false,
  cache: JSONAPICache,
  schemas: [PageSchema, ProjectSchema],
});

type Store = InstanceType<typeof Store>;

export default Store;
