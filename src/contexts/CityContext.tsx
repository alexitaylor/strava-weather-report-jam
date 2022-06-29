import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react';

const initState = {
  city: 'San Francisco',
  state: 'California',
  longitude: -122.4194155,
  latitude: 37.7749295,
};

export interface City {
  city: string;
  state: string;
  longitude: number;
  latitude: number;
}

export interface CityState {
  city: City | undefined;
  setCity: Dispatch<SetStateAction<City | undefined>>;
}

const CityContext = createContext<CityState | undefined>(undefined);
CityContext.displayName = 'CityContext';

export const useCityContext = (): CityState => {
  const context = useContext(CityContext);

  if (!context) {
    throw new Error(`useCityContext must be used within the CityContextProvider`);
  }

  return context;
};

export const CityContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<City | undefined>(initState);

  const providerState = useMemo(
    () => ({
      city: state,
      setCity: setState,
    }),
    [state]
  );

  return <CityContext.Provider value={providerState}>{children}</CityContext.Provider>;
};
