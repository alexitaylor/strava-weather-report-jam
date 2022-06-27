import { Dispatch, SetStateAction } from 'react';

export interface UserSettings {
  temperatureLow: number;
  temperatureHigh: number;
  precipitationChanceLow: number;
  precipitationChanceHigh: number;
  precipitationAmountLow: number;
  precipitationAmountHigh: number;
  windSpeedLow: number;
  windSpeedHigh: number;
}

export interface UserSettingsState {
  userSettings: UserSettings | undefined;
  setUserSettings: Dispatch<SetStateAction<UserSettings | undefined>>;
}
