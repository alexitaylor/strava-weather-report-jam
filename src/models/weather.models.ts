export interface WeatherResp {
  data?: {
    timelines: WeatherTimelines[];
    warnings: WeatherWarnings[];
  };
}

export interface WeatherTimelines {
  timestep: string;
  endTime: string;
  startTime: string;
  intervals: WeatherIntervals[];
}

export interface WeatherIntervals {
  startTime: string;
  values: WeatherIntervalsValues;
}

export interface WeatherIntervalsValues {
  cloudBase: number | null;
  cloudCeiling: number | null;
  cloudCover: number | null;
  precipitationIntensity: number;
  precipitationProbability: number;
  precipitationType: number;
  rainAccumulation: number;
  sunriseTime: string;
  sunsetTime: string;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern?: number;
  uvIndex?: number;
  weatherCode: number;
  weatherCodeDay?: number;
  weatherCodeFullDay?: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}

export interface WeatherWarnings {
  code: number;
  type: string;
  message: string;
  meta: {
    from: string;
    to: string;
    timestep?: string;
    field?: string;
  };
}
