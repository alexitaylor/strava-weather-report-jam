import { Dispatch, SetStateAction } from 'react';

export interface UserSettings {
  temperatureLow: number;
  temperatureHigh: number;
  precipitationProbabilityLow: number;
  precipitationProbabilityHigh: number;
  rainAccumulationLow: number;
  rainAccumulationHigh: number;
  windSpeedLow: number;
  windSpeedHigh: number;
}

export interface UserSettingsState {
  userSettings: UserSettings | undefined;
  setUserSettings: Dispatch<SetStateAction<UserSettings | undefined>>;
}
