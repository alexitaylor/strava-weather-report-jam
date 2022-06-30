import { randNumber } from '@ngneat/falso';
// import { format } from 'date-fns';
// TODO
// const WeatherMocked = {
//   data: {
//     timelines: [],
//     warnings: [],
//   },
// };
//
// const CurrentTimelinesMocked = {
//   timestep: 'current',
// };
//
// const HourTimelinesMocked = {
//   timestep: '1h',
// };
//
// const DayTimelinesMocked = {
//   timestep: '1d',
//   // startTime: format(new Date(), 'yyyy-MM-DD[T]HH:mm:ssZZ'),
// };

const mockIntervalValues = () => {
  const temp = randNumber({ min: 20, max: 100 });
  return {
    cloudBase: null,
    cloudCeiling: null,
    cloudCover: null,
    precipitationIntensity: randNumber({ min: 0, max: 10 }),
    precipitationProbability: randNumber({ min: 0, max: 100 }),
    precipitationType: 0,
    rainAccumulation: randNumber({ min: 0, max: 5 }),
    sunriseTime: null,
    sunsetTime: null,
    temperature: temp,
    temperatureApparent: temp,
    uvHealthConcern: randNumber({ min: 0, max: 11 }),
    uvIndex: randNumber({ min: 0, max: 11 }),
  };
};

const r = [];
for (var i = 0; i < 50; i++) {
  r.push(mockIntervalValues());
}
