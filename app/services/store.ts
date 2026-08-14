import { JSONAPICache } from '@warp-drive/json-api';
import { useLegacyStore } from '@warp-drive/legacy';

import { PageSchema } from 'portfolio/data/page';
import { ProjectSchema } from 'portfolio/data/project';
import { SsgFileHandler } from 'portfolio/utils/ssg-file-handler';

const Store = useLegacyStore({
  linksMode: false,
  cache: JSONAPICache,
  handlers: [SsgFileHandler],
  schemas: [PageSchema, ProjectSchema],
});

type Store = InstanceType<typeof Store>;

export default Store;
