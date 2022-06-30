import { UserSettings, WeatherIntervalsValues } from '../models';
import { isDefined } from '../utils';

export interface ConditionScaleValues {
  value: string;
  colorStyle: string;
  bgStyle: string;
  colorVar: string;
  description: string;
}

// type ConditionScaleKey = 'low' | 'good' | 'high' | 'veryHigh' | 'extreme';

export type IConditionScale = {
  veryLow: ConditionScaleValues;
  low: ConditionScaleValues;
  good: ConditionScaleValues;
  high: ConditionScaleValues;
  veryHigh: ConditionScaleValues;
  extreme: ConditionScaleValues;
  default: ConditionScaleValues;
};

interface ConditionIndexArgs {
  stat: number;
  low: number;
  high: number;
}

export const ConditionScale: IConditionScale = {
  veryLow: {
    value: 'Very Low',
    colorStyle: 'has-very-low-color',
    bgStyle: 'has-very-low-bg',
    colorVar: 'var(--teal-600)',
    description: '',
  },
  low: {
    value: 'Low',
    colorStyle: 'has-low-color',
    bgStyle: 'has-low-bg',
    colorVar: 'var(--green)',
    description: '',
  },
  good: {
    value: 'Good',
    colorStyle: 'has-moderate-color',
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

// TODO rename colorStyle, bgStyle, and colorVar names.
export const ConditionScaleV2 = {
  poor: {
    value: 'Poor',
    colorStyle: 'has-very-high-color',
    bgStyle: 'has-very-high-bg',
    colorVar: 'var(--brand-danger)',
    description: '',
  },
  fair: {
    value: 'Fair',
    colorStyle: 'has-high-color',
    bgStyle: 'has-high-bg',
    colorVar: 'var(--y50-gold)',
    description: '',
  },
  good: {
    value: 'Good',
    colorStyle: 'has-very-low-color',
    bgStyle: 'has-very-low-bg',
    colorVar: 'var(--emerald-600)',
    description: '',
  },
  // great: {
  //   value: 'Great',
  //   colorStyle: 'has-low-color',
  //   bgStyle: 'has-low-bg',
  //   colorVar: 'var(--green)',
  //   description: '',
  // },
  ideal: {
    value: 'Ideal',
    colorStyle: 'has-moderate-color',
    bgStyle: 'has-moderate-bg',
    colorVar: 'var(--brand-success)',
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
  veryLow: 1,
  low: 2,
  good: 3,
  high: 4,
  veryHigh: 5,
  extreme: 6,
};

export const ConditionIndexValueTwo = {
  poor: 1,
  fair: 2,
  good: 3,
  // great: 4,
  ideal: 4,
};

// export const getUvConditionIndex = (uvIndex: number): number => {
//   if (uvIndex >= 0 && uvIndex <= 5) {
//     return ConditionIndexValue.good;
//   } else if (uvIndex >= 6 && uvIndex <= 7) {
//     return ConditionIndexValue.high;
//   } else if (uvIndex >= 8 && uvIndex <= 10) {
//     return ConditionIndexValue.veryHigh;
//   } else if (uvIndex >= 11) {
//     return ConditionIndexValue.extreme;
//   } else {
//     return ConditionIndexValue.good;
//   }
// };

export const getUvConditionIndexTwo = (uvIndex: number): number => {
  if (uvIndex >= 0 && uvIndex <= 2) {
    return ConditionIndexValueTwo.ideal;
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    return ConditionIndexValueTwo.good;
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    return ConditionIndexValueTwo.fair;
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    return ConditionIndexValueTwo.fair;
  } else if (uvIndex >= 11) {
    return ConditionIndexValueTwo.poor;
  }

  return ConditionIndexValue.good;
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
    const percentDecrease = Math.round(((low - stat) / low) * 100);
    if (percentDecrease <= 10) {
      return ConditionIndexValue.low;
    } else {
      return ConditionIndexValue.veryLow;
    }
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

export const getStatStyle = ({
  stat = 0,
  low = 0,
  high = 0,
  condition,
}: {
  stat?: number;
  low?: number;
  high?: number;
  condition: string;
}): string => {
  if (!isDefined(stat) || !isDefined(low) || !isDefined(high)) {
    return '';
  }

  let index: number;
  if (condition === 'uvIndex' || condition === 'uvHealthConcern') {
    index = getUvConditionIndexTwo(stat);
  } else {
    // TODO maybe average precipitationProbability and rainAccumulation???
    // @ts-ignore
    index = getCondition[condition]({
      stat,
      low,
      high,
    });
  }

  const conditionIndex = Object.keys(ConditionIndexValueTwo).filter(
    (k) => ConditionIndexValueTwo[k as keyof typeof ConditionIndexValueTwo] === index
  )[0];

  return (
    ConditionScaleV2[conditionIndex as keyof typeof ConditionScaleV2].colorStyle ?? ConditionScaleV2.default.colorStyle
  );
};

// export const getStatStyle = ({
//   stat = 0,
//   low = 0,
//   high = 0,
// }: {
//   stat?: number;
//   low?: number;
//   high?: number;
// }): string => {
//   if (!isDefined(stat) || !isDefined(low) || !isDefined(high)) {
//     return '';
//   }
//
//   const index = getWeatherStatConditionIndex({ stat, low, high });
//
//   const condition = Object.keys(ConditionIndexValue).filter(
//     (k) => ConditionIndexValue[k as keyof typeof ConditionIndexValue] === index
//   )[0];
//
//   return ConditionScale[condition as keyof typeof ConditionScale].colorStyle ?? ConditionScale.default.colorStyle;
// };

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

const getCondition = {
  temperature: ({ stat, low, high }: ConditionIndexArgs): number => {
    if (stat >= low && stat <= high) {
      return ConditionIndexValueTwo.ideal;
    } else {
      const difference = stat < low ? low - stat : stat - high;
      if (difference < 5) {
        return ConditionIndexValueTwo.good;
      } else if (difference >= 5 && difference < 10) {
        return ConditionIndexValueTwo.good;
      } else if (difference >= 10 && difference < 20) {
        return ConditionIndexValueTwo.fair;
      } else if (difference >= 20) {
        return ConditionIndexValueTwo.poor;
      }
    }

    return ConditionIndexValueTwo.good;
  },
  windSpeed: ({ stat, low, high }: ConditionIndexArgs): number => {
    if (stat >= low && stat <= high) {
      return ConditionIndexValueTwo.ideal;
    } else {
      const difference = stat < low ? low - stat : stat - high;
      if (difference < 5) {
        return ConditionIndexValueTwo.good;
      } else if (difference >= 5 && difference < 10) {
        return ConditionIndexValueTwo.good;
      } else if (difference >= 10 && difference < 20) {
        return ConditionIndexValueTwo.fair;
      } else if (difference >= 20) {
        return ConditionIndexValueTwo.poor;
      }
    }

    return ConditionIndexValueTwo.good;
  },
  rainAccumulation: ({ stat, low, high }: ConditionIndexArgs): number => {
    if (stat >= low && stat <= high) {
      return ConditionIndexValueTwo.ideal;
    } else {
      const difference = stat < low ? low - stat : stat - high;
      if (difference < 5) {
        return ConditionIndexValueTwo.good;
      } else if (difference >= 5 && difference < 10) {
        return ConditionIndexValueTwo.good;
      } else if (difference >= 10 && difference < 20) {
        return ConditionIndexValueTwo.fair;
      } else if (difference >= 20) {
        return ConditionIndexValueTwo.poor;
      }
    }

    return ConditionIndexValueTwo.good;
  },
  precipitationProbability: ({ stat, low, high }: ConditionIndexArgs): number => {
    if (stat >= low && stat <= high) {
      return ConditionIndexValueTwo.ideal;
    } else {
      const difference = stat < low ? low - stat : stat - high;
      if (difference < 10) {
        return ConditionIndexValueTwo.good;
      } else if (difference >= 10 && difference < 20) {
        return ConditionIndexValueTwo.good;
      } else if (difference >= 20 && difference < 30) {
        return ConditionIndexValueTwo.fair;
      } else if (difference >= 30) {
        return ConditionIndexValueTwo.poor;
      }
    }
    return ConditionIndexValueTwo.good;
  },
};

export const calculateWeatherCondition = (
  currentWeather: WeatherIntervalsValues,
  userSettings: UserSettings
): ConditionScaleValues => {
  // Disabling uvIndex in overall Condition score: 'uvIndex', 'rainAccumulation', 'precipitationProbability
  const conditions = ['temperature', 'windSpeed', 'uvHealthConcern'];

  const totalConditionIndex = conditions.reduce((total, condition) => {
    let conditionIndex;
    if (condition === 'uvIndex' || condition === 'uvHealthConcern') {
      conditionIndex = getUvConditionIndexTwo(currentWeather[condition as keyof typeof currentWeather] as number);
    } else {
      // TODO maybe average precipitationProbability and rainAccumulation???
      // @ts-ignore
      conditionIndex = getCondition[condition]({
        stat: currentWeather[condition as WeatherConditionKeys],
        low: userSettings[`${condition}Low` as UserSettingsKeys],
        high: userSettings[`${condition}High` as UserSettingsKeys],
      });
    }
    return total + conditionIndex;
  }, 0);

  const average = Math.floor(totalConditionIndex / conditions.length);

  const condition = Object.keys(ConditionIndexValueTwo).filter(
    (k) => ConditionIndexValueTwo[k as keyof typeof ConditionIndexValueTwo] === average
  )[0];

  return ConditionScaleV2[condition as keyof typeof ConditionScaleV2] ?? ConditionScaleV2.default;
};

// TODO remove
// export const calculateWeatherConditionOld = (
//   currentWeather: WeatherIntervalsValues,
//   userSettings: UserSettings
// ): ConditionScaleValues => {
//   let totalConditionIndex = 0;
//   // Disabling uvIndex in overall Condition score: 'uvIndex', 'rainAccumulation', 'precipitationProbability
//   const conditions = ['temperature', 'windSpeed', 'uvHealthConcern'];
//
//   // const averageTwo =
//   //   temperatureIndex + windSpeedIndex + precipitationProbabilityIndex + uvIndex + rainAccumulationIndex;
//   // console.log('averageTwo', averageTwo);
//   const totalConditionIndexTwo = conditions.reduce((total, condition) => {
//     let conditionIndex;
//     if (condition === 'uvIndex' || condition === 'uvHealthConcern') {
//       conditionIndex = getUvConditionIndexTwo(currentWeather[condition as keyof typeof currentWeather] as number);
//     } else {
//       // TODO maybe average precipitationProbability and rainAccumulation???
//       // @ts-ignore
//       conditionIndex = getCondition[condition]({
//         stat: currentWeather[condition as WeatherConditionKeys],
//         low: userSettings[`${condition}Low` as UserSettingsKeys],
//         high: userSettings[`${condition}High` as UserSettingsKeys],
//       });
//     }
//     console.log('condition', condition);
//     console.log('conditionIndex', conditionIndex);
//     return total + conditionIndex;
//   }, 0);
//   console.log('totalConditionIndexTwo', totalConditionIndexTwo);
//   const averageTwo = Math.floor(totalConditionIndexTwo / conditions.length);
//   console.log('averageTwo', averageTwo);
//   // const totalConditionIndexThree = conditions.reduce((total, condition) => {
//   //   let conditionIndex;
//   //   if (condition === 'uvIndex' || condition === 'uvHealthConcern') {
//   //     conditionIndex = getUvConditionIndexTwo(currentWeather[condition as keyof typeof currentWeather] as number);
//   //   } else {
//   //     // TODO maybe average precipitationProbability and rainAccumulation???
//   //     conditionIndex = getWeatherConditionPercent({
//   //       stat: currentWeather[condition as WeatherConditionKeys],
//   //       low: userSettings[`${condition}Low` as UserSettingsKeys],
//   //       high: userSettings[`${condition}High` as UserSettingsKeys],
//   //     });
//   //   }
//   //
//   //   return total + conditionIndex;
//   // }, 0);
//   //
//   // console.log('totalConditionIndexThree', totalConditionIndexThree);
//   // const averageThree = Math.ceil(totalConditionIndexThree / conditions.length);
//   // console.log('averageThree', averageThree);
//
//   totalConditionIndex = conditions.reduce((total, condition) => {
//     let conditionIndex;
//     if (condition === 'uvIndex' || condition === 'uvHealthConcern') {
//       conditionIndex = getUvConditionIndex(currentWeather[condition as keyof typeof currentWeather] as number);
//     } else {
//       // TODO maybe average precipitationProbability and rainAccumulation???
//       conditionIndex = getWeatherStatConditionIndex({
//         stat: currentWeather[condition as WeatherConditionKeys],
//         low: userSettings[`${condition}Low` as UserSettingsKeys],
//         high: userSettings[`${condition}High` as UserSettingsKeys],
//       });
//     }
//     return total + conditionIndex;
//   }, 0);
//
//   const average = Math.floor(totalConditionIndex / conditions.length);
//
//   const condition = Object.keys(ConditionIndexValue).filter(
//     (k) => ConditionIndexValue[k as keyof typeof ConditionIndexValue] === average
//   )[0];
//
//   return ConditionScale[condition as keyof typeof ConditionScale] ?? ConditionScale.default;
// };
