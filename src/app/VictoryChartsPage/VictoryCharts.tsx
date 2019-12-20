import * as React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer } from 'victory';
import { PageSection } from '@patternfly/react-core';


export interface ITickerProps {
  plotData?: any;
}

const labelFormatter = ({ datum }) => `${datum.y}`;

const VictoryCharts: React.FunctionComponent<ITickerProps> = ({plotData}) => {
  const ticker = () => plotData.toArray().filter((datum) => (datum != null) ).map((e) => ({'x': e.x, 'y': e.y, 'size': 3}));
  return(
    <PageSection>
      {`Plots (${plotData.length})`}
      <div style={{ height: '75%', width: '90%' }}>
        <VictoryChart>
            <VictoryLine
              data={ticker()}
            />
        </VictoryChart>
      </div>
    </PageSection>);
};

export { VictoryCharts };
