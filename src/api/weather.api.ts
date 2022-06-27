import { addDays, formatISO, subHours } from 'date-fns';
import queryString from 'query-string';

import { TIMESTEP, UNITS } from '../constants';
import { timelineMockData } from '../mocks/timeline-mock-data';
import { WeatherResp } from '../models';
import { timeout } from '../utils';

const IS_MOCKED = true;

// set the Timelines GET endpoint as the target URL
const getTimelineURL = 'https://api.tomorrow.io/v4/timelines';

// get your key from app.tomorrow.io/development/keys
const apikey = '1Yj3aqM41jqaKVuoRBcyJNcNDwCJ7rZv';

// pick the location, as a lat,long pair
let location = [37.773972, -122.431297];

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
const getTimelineParameters = queryString.stringify(
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

const loadMockData = async () => {
  const delay = 500;

  await timeout(delay);
  return timelineMockData;
};

export const getTimeline = async (): Promise<WeatherResp> => {
  try {
    if (IS_MOCKED) {
      console.log('FETCHING MOCKED');
      return await loadMockData();
    }

    console.log('FETCHING API');
    const result = await fetch(`${getTimelineURL}?${getTimelineParameters}`);
    return result.json();
  } catch (error) {
    console.error('error: ', error);
    return Promise.reject(error);
  }
};
