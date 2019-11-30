import * as React from 'react';
import { PageSection } from '@patternfly/react-core';
import { TimeSeries } from 'pondjs';
import {
  ChartContainer,
  ChartRow,
  Charts,
  LineChart,
  YAxis,
  Resizable
} from 'react-timeseries-charts';

export interface ITickerProps {
  timeRange: any;
  eventSeries: TimeSeries;
}

const TimeSeriesChart: React.FunctionComponent<ITickerProps> = ({timeRange, eventSeries}) => {
  const fiveMinuteStyle = {
    value: {
      highlight: { fill: 'none', stroke: '619F3A', strokeWidth: 3, opacity: 0.8 },
      normal: { fill: 'none', stroke: '619F3A', strokeWidth: 3, opacity: 0.7 },
      selected: { fill: 'none', stroke: '619F3A', strokeWidth: 3, opacity: 0.8 }
    }
  };

  // Charts (after a certain amount of time, just show hourly rollup)
  const charts = (
    <Charts>
      <LineChart
        axis="y"
        series={eventSeries}
        interpolation="curveNatural"
        style={fiveMinuteStyle}
        columns={['value']}
      />
    </Charts>
  );

  return(
    <PageSection>
      {`Plots (${eventSeries.count()})`}
      <Resizable>
        <ChartContainer timeRange={timeRange}>
          <ChartRow height="500">
            <YAxis
              id="y"
              label=""
              width={0}
              min={0}
              max={2000}
              type="linear"
            />
            {charts}
          </ChartRow>
        </ChartContainer>
      </Resizable>
    </PageSection>);
};

export { TimeSeriesChart };
