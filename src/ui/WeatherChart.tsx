import classnames from 'classnames';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import { DATE_FORMAT } from '../constants';
import useWindowSize from '../hooks/useWindowSize.hook';
import { WeatherIntervals, WeatherIntervalsValues, WeatherTimelines } from '../models';
import { getCompassDirection, getUvIndexValue, isDefined } from '../utils';

const WeatherChartStyled = styled.div`
  width: calc(100vw - 5rem);
  height: 600px;
  margin: 2rem 1rem;
`;

const parseTimeLineData = (intervals: WeatherIntervals[]) => {
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
      windSpeed: values.windSpeed,
      windGust: values.windGust,
      windDirection: values.windDirection,
      precipitationProbability: values.precipitationProbability,
      rainAccumulation: values.rainAccumulation,
      precipitationIntensity: values.precipitationIntensity,
      uvHealthConcern: values.uvHealthConcern,
      uvIndex: values.uvIndex,
    };
  });
};

interface Props {
  weatherTimeLine?: WeatherTimelines;
  currentWeather?: WeatherIntervalsValues;
}

interface Conidtions {
  [key: string]: {
    key: string;
    label: string;
    colorStyle: string;
    colorVar: string;
    value?: string | number;
  };
}

// Temp, wind speed, wind direction
const conditions: Conidtions = {
  temperature: {
    key: 'temperature',
    label: 'Temperature',
    colorStyle: 'has-temperature-color',
    colorVar: 'var(--green-600)',
  },
  temperatureApparent: {
    key: 'temperatureApparent',
    label: 'Feels Like',
    colorStyle: 'has-temperature-apparent-color',
    colorVar: 'var(--emerald-600)',
  },
  windSpeed: {
    key: 'windSpeed',
    label: 'Wind Speed',
    colorStyle: 'has-wind-speed-color',
    colorVar: 'var(--purple-700)',
  },
  windGust: {
    key: 'windGust',
    label: 'Wind Gust',
    colorStyle: 'has-wind-guest-color',
    colorVar: 'var(--rose-600)',
  },
  windDirection: {
    key: 'windDirection',
    label: 'Wind Direction',
    colorStyle: 'has-wind-direction-color',
    colorVar: 'var(--pink-600)',
  },
  precipitationProbability: {
    key: 'precipitationProbability',
    label: 'Precip. Chance',
    colorStyle: 'has-precipitation-probability-color',
    colorVar: 'var(--blue-600)',
  },
  rainAccumulation: {
    key: 'rainAccumulation',
    label: 'Rain Amount',
    colorStyle: 'has-rain-accumulation-color',
    colorVar: 'var(--cyan-600)',
  },
  precipitationIntensity: {
    key: 'precipitationIntensity',
    label: 'Precip. Intensity',
    colorStyle: 'has-precipitation-intensity-color',
    colorVar: 'var(--indigo-700)',
  },
  uvHealthConcern: {
    key: 'uvHealthConcern',
    label: 'UV Health Concern',
    colorStyle: 'has-uv-health-concern-color',
    colorVar: 'var(--amber-600)',
  },
  uvIndex: {
    key: 'uvIndex',
    label: 'UV Index',
    colorStyle: 'has-uv-index-color',
    colorVar: 'var(--orange-600)',
  },
};

const getConditions = (current: WeatherIntervalsValues): Conidtions => ({
  temperature: {
    ...conditions.temperature,
    value: isDefined(current?.temperature) ? `${current?.temperature} °F` : '--',
  },
  temperatureApparent: {
    ...conditions.temperatureApparent,
    value: isDefined(current?.temperature) ? `${current?.temperature} °F` : '--',
  },
  windSpeed: {
    ...conditions.windSpeed,
    value: isDefined(current?.windSpeed) ? `${current?.windSpeed}mph` : '--',
  },
  windGust: {
    ...conditions.windGust,
    value: isDefined(current?.windGust) ? `${current?.windGust}mph` : '--',
  },
  windDirection: {
    ...conditions.windDirection,
    value: isDefined(current?.windDirection) ? `${getCompassDirection(current?.windDirection)}` : '--',
  },
  precipitationProbability: {
    ...conditions.precipitationProbability,
    value: isDefined(current?.precipitationProbability) ? `${current?.precipitationProbability}%` : '--',
  },
  rainAccumulation: {
    ...conditions.rainAccumulation,
    value: isDefined(current?.rainAccumulation) ? `${current?.rainAccumulation}in` : '--',
  },
  precipitationIntensity: {
    ...conditions.precipitationIntensity,
    value: isDefined(current?.precipitationIntensity) ? `${current?.precipitationIntensity}in/hr` : '--',
  },
  uvHealthConcern: {
    ...conditions.uvHealthConcern,
    value: getUvIndexValue(current?.uvHealthConcern || 0),
  },
  uvIndex: {
    ...conditions.uvIndex,
    value: getUvIndexValue(current?.uvIndex || 0),
  },
});

const ConditionMenuStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 1.75rem;

  .label-value {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0;

    background: none;
    border: none;
    font: inherit;
    outline: inherit;

    &:hover {
      transform: scale(1.2);
      color: var(--text-color-tertiary);
      border-bottom: 2px solid var(--text-color-tertiary);
    }

    &.active {
      font-weight: bold;
      color: var(--brand-primary);
      border-bottom: 2px solid var(--brand-primary);
    }
  }
`;

const ConditionMenu = ({
  currentConditions,
  selectedConditions,
  selectCondition,
}: {
  currentConditions: WeatherIntervalsValues;
  selectedConditions: string[];
  selectCondition(c: string): void;
}) => {
  const conditions = getConditions(currentConditions);
  return (
    <ConditionMenuStyled>
      {Object.values(conditions).map(({ label, value, colorStyle, key }) => (
        <button
          className={classnames('label-value', {
            [colorStyle]: selectedConditions.includes(key),
          })}
          key={label}
          onClick={() => selectCondition(key)}
        >
          <span>{label}</span>
          <span>{value}</span>
        </button>
      ))}
    </ConditionMenuStyled>
  );
};

const WeatherChart = ({ weatherTimeLine, currentWeather }: Props) => {
  const [selectedConditions, setSelectedConditions] = useState(['temperature', 'windSpeed']);

  const data = useMemo(() => {
    return parseTimeLineData(weatherTimeLine?.intervals ?? []);
  }, [weatherTimeLine]);

  const { width } = useWindowSize();
  const brushEndIndex = useMemo(() => {
    if (width >= 1400) {
      return 18;
    } else if (width >= 1250 && width < 1400) {
      return 15;
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

  const selectCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions((prev) => prev.filter((c) => c !== condition));
    } else {
      setSelectedConditions((prev) => [...prev, condition]);
    }
  };

  return (
    <WeatherChartStyled>
      <h3>WeatherChart</h3>
      <ConditionMenu
        currentConditions={currentWeather as WeatherIntervalsValues}
        selectedConditions={selectedConditions}
        selectCondition={selectCondition}
      />
      <ResponsiveContainer width="100%" height="100%">
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
          <Brush dataKey="startTime" height={30} stroke="var(--orange)" endIndex={brushEndIndex} travellerWidth={5} />
          {selectedConditions.map((k) => (
            <Line key={k} type="monotone" dataKey={k} stroke={conditions[k].colorVar} strokeWidth={3} />
          ))}
          {/*<Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={3} />*/}
          {/*<Line type="monotone" dataKey="temperatureApparent" stroke="#82ca9d" strokeWidth={3} />*/}
          {/*<Line type="monotone" dataKey="windSpeed" stroke="#82ca9d" strokeWidth={3} />*/}
        </LineChart>
      </ResponsiveContainer>
    </WeatherChartStyled>
  );
};

export default WeatherChart;
