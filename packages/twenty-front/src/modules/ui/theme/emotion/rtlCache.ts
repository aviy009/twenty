import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

export const rtlCache = createCache({
  key: 'tw-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
