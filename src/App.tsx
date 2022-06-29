import './App.css';

import { isSameDay } from 'date-fns';
import { useEffect } from 'react';

import { getTimeline } from './api';
import CitySearch from './api/CitySearch';
import chainRingLogo from './assets/chainRingLogo.png';
import { TIMESTEP } from './constants';
import { useCityContext } from './contexts/CityContext';
import { useWeatherContext, WEATHER_ACTIONS } from './contexts/WeatherContext';
import useSafeDispatch from './hooks/use-safe-dispatch.hook';
import ConditionScaleLegend from './ui/ConditionScaleLegend';
import CurrentWeatherStat from './ui/CurrentWeatherStat';
import ScreenWidthToast from './ui/ScreenWidthToast';
import WeatherChart from './ui/WeatherChart';
import WeatherPreference from './ui/WeatherPreference';

function App() {
  const { state, dispatch } = useWeatherContext();
  const { currentWeather, hourTimestep } = state;
  const safeDispatch = useSafeDispatch(dispatch);
  const { city } = useCityContext();

  useEffect(() => {
    (async () => {
      const { data } = await getTimeline({
        longitude: city?.longitude,
        latitude: city?.latitude,
      });
      console.log('data', data);
      // console.log('data', JSON.stringify(data));
      data?.timelines.forEach((data) => {
        switch (data.timestep) {
          case TIMESTEP.CURRENT: {
            break;
          }
          case TIMESTEP.DAY: {
            const currentDay = data.intervals.filter((item) => {
              return isSameDay(new Date(), new Date(item.startTime));
            })[0]?.values;

            safeDispatch({ type: WEATHER_ACTIONS.SET_CURRENT_WEATHER, payload: currentDay });
            safeDispatch({ type: WEATHER_ACTIONS.SET_TIMESTEP_DAY_WEATHER, payload: data });
            break;
          }
          case TIMESTEP.HOUR: {
            safeDispatch({ type: WEATHER_ACTIONS.SET_TIMESTEP_HOUR_WEATHER, payload: data });
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
      <img src={chainRingLogo} alt="" />
      <CitySearch />
      <CurrentWeatherStat />
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
