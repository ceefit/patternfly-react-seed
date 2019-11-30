import * as React from 'react';
import { PageSection } from '@patternfly/react-core';
import { PatternflyChart } from '@app/PatternflyChartPage/PatternflyChart';
import { useInterval } from '@app/utils/useInterval';
import CircularBuffer from 'circularbuffer';

let x = 0;
const rate = 20;

function generateDataPoint() {
  x += Math.random();
  const y = Math.random() - 0.5;
  return ({x, y});
}

const PatternflyChartPage: React.FunctionComponent<{}> = () => {
  const [dataPoint, setDataPoint] = React.useState<{x: number; y: number}>(null);
  const [events, setEvents] = React.useState(new CircularBuffer<{x: number; y: number}>(200));

  const pushNewDataPoint = () => {
    const newDataPoint = generateDataPoint();
    setDataPoint(newDataPoint);
  };

  useInterval(() => {
    pushNewDataPoint();
  }, rate);

  React.useEffect(() => {
    const newEvents = events;
    newEvents.enq(dataPoint);
    setEvents(newEvents);
  }, [dataPoint]);


  return  (
    <PageSection>
      <PatternflyChart plotData={events}/>
    </PageSection>
  )
};

export { PatternflyChartPage };
