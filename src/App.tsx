import './App.css';

import { isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';

import { getTimeline } from './api';
import CitySearch from './api/CitySearch';
import { TIMESTEP } from './constants';
import { useCityContext } from './contexts/CityContext';
import { WeatherIntervalsValues, WeatherTimelines } from './models';
import ConditionScaleLegend from './ui/ConditionScaleLegend';
import CurrentWeatherStat from './ui/CurrentWeatherStat';
import ScreenWidthToast from './ui/ScreenWidthToast';
import WeatherChart from './ui/WeatherChart';
import WeatherPreference from './ui/WeatherPreference';

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherIntervalsValues>();
  const [dayTimestep, setDayTimestep] = useState<WeatherTimelines>();
  const [hourTimestep, setHourTimestep] = useState<WeatherTimelines>();
  const { city } = useCityContext();

  useEffect(() => {
    (async () => {
      const { data } = await getTimeline({
        longitude: city?.longitude,
        latitude: city?.latitude,
        city: city?.city,
      });
      console.log('data', data);
      // console.log('data', JSON.stringify(data));
      data?.timelines.forEach((data) => {
        switch (data.timestep) {
          case TIMESTEP.CURRENT: {
            // setCurrentWeather(data.intervals[0].values);
            break;
          }
          case TIMESTEP.DAY: {
            const currentDay = data.intervals.filter((item) => {
              return isSameDay(new Date(), new Date(item.startTime));
            })[0]?.values;
            setCurrentWeather(currentDay);

            setDayTimestep(data);
            break;
          }
          case TIMESTEP.HOUR: {
            setHourTimestep(data);
            break;
          }
        }
      });
    })();
  }, [city?.longitude, city?.latitude, city?.city]);

  return (
    <div className="App">
      <ScreenWidthToast />
      {/*<header className="App-header">*/}
      {/*  <p>San Francisco</p>*/}
      {/*</header>*/}
      <h1>Weather Conditions</h1>
      <CitySearch />
      <CurrentWeatherStat currentWeather={currentWeather} dayTimestep={dayTimestep} />
      <hr />
      <ConditionScaleLegend />
      <hr />
      <WeatherPreference />
      <hr />
      <WeatherChart weatherTimeLine={hourTimestep} currentWeather={currentWeather} />
      <div style={{ margin: '5rem' }} />
    </div>
  );
}

export default App;
