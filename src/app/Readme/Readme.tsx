import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';

const Readme: React.FunctionComponent<{}> = () => (
    <PageSection>
      <Title size="lg">
        Smash one of the buttons on the nav bar to compare the rendering performance between
        Patternfly's charts, and react-timeseries-charts
      </Title>
    </PageSection>
  )

export { Readme };
