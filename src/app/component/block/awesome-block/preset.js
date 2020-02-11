/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('awesome-block', require('./awesome-block.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/awesome-block @root}}
    </hbs>`,
  require('./data/default'),
);
