import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { UserSettings, UserSettingsState } from '../models';

const initState = {
  temperatureLow: 60,
  temperatureHigh: 80, // 80
  precipitationProbabilityLow: 0,
  precipitationProbabilityHigh: 50,
  rainAccumulationLow: 0,
  rainAccumulationHigh: 3,
  windSpeedLow: 0,
  windSpeedHigh: 20, // 20
};

const UserSettingsContext = createContext<UserSettingsState | undefined>(undefined);
UserSettingsContext.displayName = 'UserSettingsContext';

export const useUserSettingsContext = (): UserSettingsState => {
  const context = useContext(UserSettingsContext);

  if (!context) {
    throw new Error(`useUserWeatherPreferenceContext must be used within the UserSettingsProvider`);
  }

  return context;
};

export const UserSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UserSettings | undefined>(initState);

  const providerState = useMemo(
    () => ({
      userSettings: state,
      setUserSettings: setState,
    }),
    [state]
  );

  return <UserSettingsContext.Provider value={providerState}>{children}</UserSettingsContext.Provider>;
};
