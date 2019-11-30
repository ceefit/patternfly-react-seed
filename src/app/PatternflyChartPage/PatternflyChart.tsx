import * as React from 'react';
import { Chart, ChartAxis, ChartGroup, ChartLine, ChartVoronoiContainer } from '@patternfly/react-charts';
import { PageSection } from '@patternfly/react-core';


export interface ITickerProps {
  plotData?: any;
}

const labelFormatter = ({ datum }) => `${datum.y}`;

const PatternflyChart: React.FunctionComponent<ITickerProps> = ({plotData}) => {
  const ticker = () => plotData.toArray().filter((datum) => (datum != null) ).map((e) => ({'x': e.x, 'y': e.y, 'size': 3}));
  return(
    <PageSection>
      {`Plots (${plotData.length})`}
      <div style={{ height: '75%', width: '90%' }}>
        <Chart
          ariaDesc="Spreads"
          ariaTitle="Coin Spreads"
          containerComponent={<ChartVoronoiContainer labels={labelFormatter} constrainToVisibleArea />}
          height={450}
          padding={{
            bottom: 150,
            left: 50,
            right: 150, // Adjusted to accommodate legend
            top: 50
          }}
          width={600}
        >
          <ChartAxis dependentAxis showGrid tickValues={[-0.5, 0, 0.5]} />
          <ChartGroup>
            <ChartLine
              data={ticker()}
            />
          </ChartGroup>
        </Chart>
      </div>
    </PageSection>);
};

export { PatternflyChart };
