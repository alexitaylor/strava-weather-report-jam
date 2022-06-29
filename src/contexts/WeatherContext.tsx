import { createContext, Dispatch, ReactNode, useContext, useMemo, useReducer } from 'react';

import { WeatherIntervalsValues, WeatherTimelines } from '../models';
import { calculateWeatherCondition, ConditionScale, ConditionScaleValues } from '../service';
import { useUserSettingsContext } from './UserSettingsContext';

// TODO move to separate files: actions, reducer...

interface WeatherContextState {
  weatherCondition: ConditionScaleValues;
  currentWeather?: WeatherIntervalsValues;
  dayTimestep?: WeatherTimelines;
  hourTimestep?: WeatherTimelines;
}

// Context
const WeatherContext = createContext<{ state: WeatherContextState; dispatch: Dispatch<WeatherActions> } | undefined>(
  undefined
);
WeatherContext.displayName = 'WeatherContext';

// Hook
export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error(`useWeatherContext must be used within the WeatherContextProvider`);
  }

  return context;
};

// Actions
export enum WEATHER_ACTIONS {
  // eslint-disable-next-line no-unused-vars
  SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER',
  // eslint-disable-next-line no-unused-vars
  SET_TIMESTEP_HOUR_WEATHER = 'SET_TIMESTEP_HOUR_WEATHER',
  // eslint-disable-next-line no-unused-vars
  SET_TIMESTEP_DAY_WEATHER = 'SET_TIMESTEP_DAY_WEATHER',
}

export interface ActionEvent<T, P = { [prop: string]: unknown }> {
  type: T;
  payload?: P;
}

export type SetCurrentWeatherAction = ActionEvent<WEATHER_ACTIONS.SET_CURRENT_WEATHER, WeatherIntervalsValues>;
export type SetTimestepHourAction = ActionEvent<WEATHER_ACTIONS.SET_TIMESTEP_HOUR_WEATHER, WeatherTimelines>;
export type SetTimestepDayAction = ActionEvent<WEATHER_ACTIONS.SET_TIMESTEP_DAY_WEATHER, WeatherTimelines>;

export type WeatherActions = SetCurrentWeatherAction | SetTimestepHourAction | SetTimestepDayAction;

// Reducer
function reducer(state: WeatherContextState, action: WeatherActions) {
  switch (action.type) {
    case WEATHER_ACTIONS.SET_CURRENT_WEATHER: {
      const currentWeather = action.payload;
      return { ...state, currentWeather };
    }
    case WEATHER_ACTIONS.SET_TIMESTEP_HOUR_WEATHER: {
      const hourTimestep = action.payload;
      return { ...state, hourTimestep };
    }
    case WEATHER_ACTIONS.SET_TIMESTEP_DAY_WEATHER: {
      const dayTimestep = action.payload;
      return { ...state, dayTimestep };
    }
    default: {
      throw new Error(`Unhandled action type: ${action['type']}`);
    }
  }
}

// Provider
export const WeatherContextProvider = ({ children }: { children: ReactNode }) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer);
  const { userSettings } = useUserSettingsContext();

  const weatherCondition = useMemo(() => {
    if (userSettings && state?.currentWeather) {
      return calculateWeatherCondition(state.currentWeather, userSettings);
    }

    return ConditionScale.default;
  }, [state?.currentWeather, userSettings]);

  const providerState = useMemo(
    () => ({
      state: {
        ...state,
        weatherCondition,
      },
      dispatch,
    }),
    [state, weatherCondition]
  );

  return <WeatherContext.Provider value={providerState}>{children}</WeatherContext.Provider>;
};
