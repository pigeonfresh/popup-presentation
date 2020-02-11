/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('n01-popup', require('./n01-popup.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/n01-popup @root}}
    </hbs>`,
  require('./data/default'),
);
