import { addDays, formatISO, subHours } from 'date-fns';
import queryString from 'query-string';

import { TIMESTEP, UNITS } from '../constants';
import { WeatherResp } from '../models';
import { isDefined } from '../utils';

// set the Timelines GET endpoint as the target URL
const getTimelineURL = 'https://api.tomorrow.io/v4/timelines';

// get your key from app.tomorrow.io/development/keys
const apikey = '1Yj3aqM41jqaKVuoRBcyJNcNDwCJ7rZv';

// list the fields
const fields = [
  'precipitationIntensity',
  'precipitationType',
  'precipitationProbability',
  'rainAccumulation',
  'windSpeed',
  'windGust',
  'windDirection',
  'temperature',
  'temperatureApparent',
  'cloudCover',
  'cloudBase',
  'cloudCeiling',
  'weatherCode',
  'weatherCodeDay',
  'weatherCodeFullDay',
  'sunriseTime',
  'sunsetTime',
  'uvIndex',
  'uvHealthConcern',
];

// set the timesteps, like "current", "1h" and "1d"
const timesteps = [TIMESTEP.CURRENT, TIMESTEP.DAY, TIMESTEP.HOUR];

// configure the time frame up to 6 hours back and 15 days out
// const now = moment.utc();
const now = new Date();
// const startTime = moment.utc(now).add(0, "minutes").toISOString();
const startTime = formatISO(subHours(now, 6));
// const endTime = moment.utc(now).add(1, "days").toISOString();
const endTime = formatISO(addDays(now, 5));

// specify the timezone, using standard IANA timezone format
const timezone = 'America/Los_Angeles';

// request the timelines with all the query string parameters as options
const getTimelineParameters = (location: number[]) =>
  queryString.stringify(
    {
      apikey,
      location,
      fields,
      units: UNITS,
      timesteps,
      startTime,
      endTime,
      timezone,
    },
    { arrayFormat: 'comma' }
  );

export const getTimeline = async ({
  longitude,
  latitude,
}: {
  longitude?: number;
  latitude?: number;
}): Promise<WeatherResp> => {
  try {
    console.log('FETCHING API');
    // pick the location, as a lat,long pair
    let location: number[] = [37.773972, -122.431297];
    if (isDefined(longitude) && isDefined(latitude)) {
      // @ts-ignore
      location = [latitude, longitude];
    }
    const params = getTimelineParameters(location);
    const result = await fetch(`${getTimelineURL}?${params}`);
    return result.json();
  } catch (error) {
    console.error('error: ', error);
    return Promise.reject(error);
  }
};
