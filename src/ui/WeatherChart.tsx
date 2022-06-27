import { format } from 'date-fns';
import { useCallback, useEffect, useMemo } from 'react';
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import { DATE_FORMAT } from '../constants';
import useWindowSize from '../hooks/useWindowSize.hook';
import { WeatherIntervals, WeatherTimelines } from '../models';

const WeatherChartStyled = styled.div`
  width: calc(100vw - 3rem);
  height: 600px;
  margin: 2rem 1rem;

  > .graph-wrapper {
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .graph-wrapper > .y-axis-wrapper {
    background: white;
    position: sticky;
    left: 0;
    z-index: 3;
  }
`;

const parseTimeLineData = (intervals: WeatherIntervals[]) => {
  console.log('intervals', intervals);
  return intervals?.slice(0, 500).map(({ startTime, values }, index) => {
    let startTimeFormatted = format(new Date(startTime), DATE_FORMAT.HOUR_MIN);
    startTimeFormatted =
      index === 0 || startTimeFormatted === '12:00 am'
        ? format(new Date(startTime), DATE_FORMAT.TWO)
        : startTimeFormatted;
    return {
      startTime: startTimeFormatted,
      temperature: values.temperature,
      temperatureApparent: values.temperatureApparent,
    };
  });
};

interface Props {
  weatherTimeLine?: WeatherTimelines;
}

const WeatherChart = ({ weatherTimeLine }: Props) => {
  const data = useMemo(() => {
    return parseTimeLineData(weatherTimeLine?.intervals ?? []);
  }, [weatherTimeLine]);

  const { width } = useWindowSize();
  const brushEndIndex = useMemo(() => {
    if (width >= 1250) {
      return 16;
    } else if (width >= 1000 && width < 1250) {
      return 13;
    } else if (width >= 950 && width < 1000) {
      return 12;
    } else if (width >= 850 && width < 950) {
      return 10;
    } else if (width >= 800 && width < 850) {
      return 8;
    } else if (width >= 750 && width < 800) {
      return 6;
    } else if (width < 750) {
      return 5;
    }
  }, [width]);

  return (
    <WeatherChartStyled>
      <h3>WeatherChart</h3>
      <ResponsiveContainer width="100%" height="100%">
        {/*<div className="graph-wrapper">*/}
        {/*width={1000}
          height={400}*/}
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis interval={0} dataKey="startTime" />
          {/*interval={0} domain={[0, 110]}*/}
          <YAxis />
          <Tooltip />
          <Legend />
          <Brush dataKey="startTime" height={30} stroke="#8884d8" endIndex={brushEndIndex} travellerWidth={5} />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={3} />
          <Line type="monotone" dataKey="temperatureApparent" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
        {/*</div>*/}
      </ResponsiveContainer>
    </WeatherChartStyled>
  );
};

export default WeatherChart;
