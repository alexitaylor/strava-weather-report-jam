import classnames from 'classnames';
import { differenceInHours, differenceInMinutes, format } from 'date-fns';
import { useEffect, useState } from 'react';

import { UNITS } from '../constants';
import { useUserSettingsContext } from '../contexts/UserSettingsContext';
import { WeatherIntervalsValues, WeatherTimelines } from '../models';
import { getCompassDirection, getWeatherCodes } from '../utils';
import Button from './Button/Button';
import ButtonGroup from './Button/ButtonGroup';
import CurrentWeatherStatStyled from './CurrentWeatherStat.styled';
import DegreeSymbol from './DegreesSymbol';
import Stat from './Stat';
import WeatherCodeImage from './WeatherCodeImage';

const getUvIndexValue = (uvIndex: number) => {
  if (uvIndex <= 2) {
    return 'Low';
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    return 'Moderate';
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    return 'High';
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    return 'Very High';
  } else if (uvIndex >= 11) {
    return 'Extreme';
  } else {
    return uvIndex ?? '--';
  }
};

const getTimeToSunset = (sunsetTime: string): string => {
  const sunsetTimeDate = new Date(sunsetTime);
  const now = new Date();
  const diffHours = differenceInHours(sunsetTimeDate, now);
  const diffMin = differenceInMinutes(sunsetTimeDate, now) % 60;
  return `${diffHours}hrs ${diffMin}min`;
};

const getWeatherStats = (stats?: WeatherIntervalsValues) => {
  return {
    temperatureApparent: stats?.temperatureApparent ? `${Math.round(stats?.temperatureApparent)}°` : '--',
    weatherCodeDay: getWeatherCodes('weatherCodeDay', stats?.weatherCodeDay),
    precipitationProbability: `${stats?.precipitationProbability ?? '--'}%`,
    rainAccumulation: `${stats?.rainAccumulation ?? '--'} in`,
    sunriseTime: stats?.sunriseTime ? format(new Date(stats.sunriseTime), 'h:mm aaa') : '--',
    sunsetTime: stats?.sunsetTime
      ? `${format(new Date(stats.sunsetTime), 'h:mm aaa')} (${getTimeToSunset(stats.sunsetTime)})`
      : '--',
    windSpeed: `${stats?.windSpeed ?? '--'}mph`,
    windDirection: stats?.windDirection ? `${getCompassDirection(stats.windDirection)} (${stats.windDirection})` : '--',
    uvIndex: getUvIndexValue(stats?.uvIndex || 0),
    uvHealthConcern: getUvIndexValue(stats?.uvHealthConcern || 0),
  };
};

const getUvIndexStyle = (uvIndex: string) =>
  ({
    Low: 'has-low-color',
    Moderate: 'has-moderate-color',
    High: 'has-high-color',
    ['Very High']: 'has-very-high-color',
    Extreme: 'has-extreme-color',
  }[uvIndex]);

const getStatStyle = ({ stat, low, high }: { stat?: number; low?: number; high?: number }): string => {
  if (!stat || !low || !high) {
    return '';
  }

  if (stat < low) {
    return 'has-high-color';
  } else if (stat >= low && stat <= high) {
    return 'has-moderate-color';
  } else if (stat > high) {
    return 'has-extreme-color';
  } else {
    return '';
  }
};

interface CurrentWeatherStatProps {
  currentWeather?: WeatherIntervalsValues;
  dayTimestep?: WeatherTimelines;
}

const CurrentWeatherStat = ({ currentWeather: currentWeatherProp, dayTimestep }: CurrentWeatherStatProps) => {
  const [activeDay, setActiveDay] = useState(dayTimestep?.intervals[0].startTime);
  const [currentWeather, setCurrentWeather] = useState(currentWeatherProp);
  const { userSettings } = useUserSettingsContext();

  const weatherDescription = getWeatherCodes('weatherCodeDay', currentWeather?.weatherCodeDay);
  const {
    temperatureApparent,
    weatherCodeDay,
    precipitationProbability,
    rainAccumulation,
    sunriseTime,
    sunsetTime,
    windSpeed,
    windDirection,
    uvIndex,
    uvHealthConcern,
  } = getWeatherStats(currentWeather);
  const currentDate = activeDay ?? new Date();

  useEffect(() => {
    if (dayTimestep) {
      setActiveDay(dayTimestep?.intervals[0].startTime);
    }
  }, [dayTimestep]);

  useEffect(() => {
    if (currentWeatherProp) {
      setCurrentWeather(currentWeatherProp);
    }
  }, [currentWeatherProp]);

  return (
    <CurrentWeatherStatStyled>
      {/*Right Side */}
      <div className="current-weather-container">
        <div className="date-location">
          <span className="day">{format(new Date(currentDate), 'eeee')}</span>
          <span className="date">{format(new Date(currentDate), 'MMMM do, yyyy')}</span>
          <span className="location">San Francisco</span>
        </div>
        <div className="current-weather-stats">
          <div className="weather-code mr-3">
            <WeatherCodeImage weatherCode={currentWeather?.weatherCodeDay} weatherDescription={weatherDescription} />
            <span>{weatherDescription}</span>
          </div>
          <div className="temperature">
            <span>
              {currentWeather?.temperature ? (
                <>
                  {Math.round(currentWeather?.temperature)} <DegreeSymbol units={UNITS} />
                </>
              ) : (
                '--'
              )}
            </span>
            <span className="feels-like">
              {currentWeather?.temperatureApparent ? (
                <>
                  Feels like: {Math.round(currentWeather?.temperatureApparent)} <DegreeSymbol units={UNITS} />
                </>
              ) : (
                '--'
              )}
            </span>
          </div>
        </div>
      </div>
      {/*Left Side*/}
      <div className="weather-stats-container">
        {/* Weather Stats*/}
        <div className="weather-stats">
          <div className="stats-container">
            <Stat
              label={'Feels like'}
              value={temperatureApparent}
              className={getStatStyle({
                stat: currentWeather?.temperatureApparent,
                low: userSettings?.temperatureLow,
                high: userSettings?.temperatureHigh,
              })}
            />
            <Stat label={'Condition'} value={weatherCodeDay} />
          </div>
          <div className="stats-container">
            <Stat
              label={'Precipitation Chance'}
              value={precipitationProbability}
              className={getStatStyle({
                stat: currentWeather?.precipitationProbability,
                low: userSettings?.precipitationChanceLow,
                high: userSettings?.precipitationChanceHigh,
              })}
            />
            <Stat
              label={'Precipitation Amount'}
              value={rainAccumulation}
              className={getStatStyle({
                stat: currentWeather?.rainAccumulation,
                low: userSettings?.precipitationAmountLow,
                high: userSettings?.precipitationAmountHigh,
              })}
            />
          </div>
          <div className="stats-container">
            <Stat label={'Sunrise'} value={sunriseTime} />
            <Stat label={'Sunset'} value={sunsetTime} />
          </div>
          <div className="stats-container">
            <Stat
              label={'Wind Speed'}
              value={windSpeed}
              className={getStatStyle({
                stat: currentWeather?.windSpeed,
                low: userSettings?.windSpeedLow,
                high: userSettings?.windSpeedHigh,
              })}
            />
            <Stat label={'Wind Direction'} value={windDirection} />
          </div>
          <div className="stats-container">
            <Stat label={'UV Index'} value={uvIndex} className={getUvIndexStyle(uvIndex as string)} />
            <Stat
              label={'UV Health Concern'}
              value={uvHealthConcern}
              className={getUvIndexStyle(uvHealthConcern as string)}
            />
          </div>
        </div>

        {/*Forecast*/}
        <ButtonGroup className="forecast">
          {dayTimestep?.intervals.map(({ startTime, values }) => (
            <Button
              className={classnames('forecast-day', {
                active: activeDay === startTime,
              })}
              onClick={() => {
                setActiveDay(startTime);
                setCurrentWeather(values);
              }}
              key={startTime}
            >
              <WeatherCodeImage
                weatherCode={values?.weatherCodeDay}
                weatherDescription={getWeatherCodes('weatherCodeDay', values?.weatherCodeDay)}
              />
              <span className="forecast-date">{format(new Date(startTime), 'eee')}</span>
              <span className="forecast-temperature">{Math.round(values?.temperature)}</span>
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </CurrentWeatherStatStyled>
  );
};

export default CurrentWeatherStat;
