import { UserSettings, WeatherIntervalsValues } from '../models';

export interface ConditionScaleValues {
  value: string;
  colorStyle: string;
  bgStyle: string;
  colorVar: string;
  description: string;
}

// type ConditionScaleKey = 'low' | 'good' | 'high' | 'veryHigh' | 'extreme';

export type IConditionScale = {
  low: ConditionScaleValues;
  good: ConditionScaleValues;
  high: ConditionScaleValues;
  veryHigh: ConditionScaleValues;
  extreme: ConditionScaleValues;
  default: ConditionScaleValues;
};

export const ConditionScale: IConditionScale = {
  low: {
    value: 'Low',
    colorStyle: 'has-low-color',
    bgStyle: 'has-low-bg',
    colorVar: 'var(--green)',
    description: '',
  },
  good: {
    value: 'Good',
    colorStyle: 'has-low-color',
    bgStyle: 'has-moderate-bg',
    colorVar: 'var(--brand-success)',
    description: '',
  },
  high: {
    value: 'High',
    colorStyle: 'has-high-color',
    bgStyle: 'has-high-bg',
    colorVar: 'var(--y50-gold)',
    description: '',
  },
  veryHigh: {
    value: 'Very high',
    colorStyle: 'has-very-high-color',
    bgStyle: 'has-very-high-bg',
    colorVar: 'var(--brand-danger)',
    description: '',
  },
  extreme: {
    value: 'Extreme',
    colorStyle: 'has-extreme-color',
    bgStyle: 'has-extreme-bg',
    colorVar: 'var(--orange-dark)',
    description: '',
  },
  default: {
    value: 'default',
    colorStyle: 'has-orange-color',
    bgStyle: 'has-orange-bg',
    colorVar: 'var(--orange)',
    description: '',
  },
};

export const ConditionIndexValue = {
  low: 1,
  good: 2,
  high: 3,
  veryHigh: 4,
  extreme: 5,
};

export const getUvConditionIndex = (uvIndex: number): number => {
  if (uvIndex >= 0 && uvIndex <= 5) {
    return ConditionIndexValue.good;
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    return ConditionIndexValue.high;
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    return ConditionIndexValue.veryHigh;
  } else if (uvIndex >= 11) {
    return ConditionIndexValue.extreme;
  } else {
    return ConditionIndexValue.good;
  }
};

export const getWeatherStatConditionIndex = ({
  stat,
  low,
  high,
}: {
  stat: number;
  low: number;
  high: number;
}): number => {
  if (stat < low) {
    return ConditionIndexValue.low;
  } else if (stat >= low && stat <= high) {
    return ConditionIndexValue.good;
  } else if (stat > high) {
    const percentIncrease = Math.round(((stat - high) / high) * 100);
    if (percentIncrease <= 10) {
      return ConditionIndexValue.high;
    } else if (percentIncrease > 10 && percentIncrease <= 20) {
      return ConditionIndexValue.veryHigh;
    } else if (percentIncrease > 20) {
      return ConditionIndexValue.extreme;
    }
  }

  return ConditionIndexValue.good;
};

type WeatherConditionKeys = 'temperature' | 'precipitationProbability' | 'rainAccumulation' | 'windSpeed';
type UserSettingsKeys =
  | 'temperatureLow'
  | 'temperatureHigh'
  | 'precipitationProbabilityLow'
  | 'precipitationProbabilityHigh'
  | 'rainAccumulationLow'
  | 'rainAccumulationHigh'
  | 'windSpeedLow'
  | 'windSpeedHigh';

export const calculateWeatherCondition = (
  currentWeather: WeatherIntervalsValues,
  userSettings: UserSettings
): ConditionScaleValues => {
  let totalConditionIndex = 0;
  const conditions = [
    'temperature',
    'precipitationProbability',
    'rainAccumulation',
    'windSpeed',
    'uvIndex',
    'uvHealthConcern',
  ];

  totalConditionIndex = conditions.reduce((total, condition) => {
    let conditionIndex;
    if (condition === 'uvIndex' || condition === 'uvHealthConcern') {
      conditionIndex = getUvConditionIndex(currentWeather[condition as keyof typeof currentWeather] as number);
    } else {
      // TODO maybe average precipitationProbability and rainAccumulation???
      conditionIndex = getWeatherStatConditionIndex({
        stat: currentWeather[condition as WeatherConditionKeys],
        low: userSettings[`${condition}Low` as UserSettingsKeys],
        high: userSettings[`${condition}High` as UserSettingsKeys],
      });
    }

    return total + conditionIndex;
  }, 0);

  const average = Math.ceil(totalConditionIndex / conditions.length);
  const condition = Object.keys(ConditionIndexValue).filter(
    (k) => ConditionIndexValue[k as keyof typeof ConditionIndexValue] === average
  )[0];

  return ConditionScale[condition as keyof typeof ConditionScale] ?? ConditionScale.default;
};
