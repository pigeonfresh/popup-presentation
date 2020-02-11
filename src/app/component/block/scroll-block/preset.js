/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('scroll-block', require('./scroll-block.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/scroll-block @root}}
    </hbs>`,
  require('./data/default'),
);
