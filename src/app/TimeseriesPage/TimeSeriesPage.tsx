import * as React from 'react';
import { PageSection } from '@patternfly/react-core';
import { TimeSeriesChart } from '@app/TimeseriesPage/TimeSeriesChart';
import CircularBuffer from 'circularbuffer';
import { useInterval } from '@app/utils/useInterval';
import { TimeEvent, TimeSeries, TimeRange } from 'pondjs';

const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const rate = 20;

// Time Range for the chart axis
const initialBeginTime = new Date(2019, 12, 8);
const timeWindow = 3 * hours;
const increment = minute;

const getNewEvent = (t)=> {
  const base: number = Math.sin(t.getTime() / 10000000) * 350 + 500;
  return new TimeEvent(t, base + Math.random() * 1000, 10);
};

const TimeSeriesPage: React.FunctionComponent<{}> = () => {
  const [time, setTime] = React.useState(new Date(2019, 12, 8));
  const [events, setEvents] = React.useState(new CircularBuffer<TimeEvent>(200));

  useInterval(() => {
    const newTime = time.getTime() + increment;
    const t = new Date(newTime);
    setTime(t);
  }, rate);

  React.useEffect(() => {
    const event = getNewEvent(time);
    // Raw events
    const newEvents = events;
    newEvents.enq(event);
    setEvents(newEvents);
  }, [ time ]);

  //
  // Create a TimeSeries for our raw events
  //
  const eventSeries = new TimeSeries({
    events: events.toArray(),
    name: 'raw'
  });

  let beginTime;
  const endTime = new Date(time.getTime() + minute);
  if (endTime.getTime() - timeWindow < initialBeginTime.getTime()) {
    beginTime = initialBeginTime;
  } else {
    beginTime = new Date(endTime.getTime() - timeWindow);
  }
  const timeRange = new TimeRange(beginTime, endTime);

  return  (
    <PageSection>
      <TimeSeriesChart timeRange={timeRange} eventSeries={eventSeries} />
    </PageSection>
  )
};

export { TimeSeriesPage };
