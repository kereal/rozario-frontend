import { addParameters } from '@storybook/svelte';
import '../static/global.css'
import '../static/sprite-flag.css'
import '../static/freakflags.css'

import {
  INITIAL_VIEWPORTS,
} from '@storybook/addon-viewport';

const customViewports = {
  LaptopHD: {
    name: 'Laptop - hd',
    styles: {
      width: '1366px',
      height: '768px',
    },
  },
  MinBreakpoint: {
    name: 'minimum breakpoint',
    styles: {
      width: '1000px',
      height: '735px',
    },
  },
};

addParameters({
    viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...customViewports,
    },
  },
});

