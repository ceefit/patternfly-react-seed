import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Readme } from '@app/Readme/Readme';

const stories = storiesOf('Components', module);
stories.addDecorator(withInfo);
stories.add(
  'Dashboard',
  () => <Readme />,
  { info: { inline: true } }
);
