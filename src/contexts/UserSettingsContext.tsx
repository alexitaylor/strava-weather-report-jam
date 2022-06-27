import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { UserSettings, UserSettingsState } from '../models';

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
  const [state, setState] = useState<UserSettings | undefined>(undefined);

  const providerState = useMemo(
    () => ({
      userSettings: state,
      setUserSettings: setState,
    }),
    [state]
  );

  return <UserSettingsContext.Provider value={providerState}>{children}</UserSettingsContext.Provider>;
};
