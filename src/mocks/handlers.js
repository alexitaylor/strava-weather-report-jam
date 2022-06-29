import { rest } from 'msw';

import { seattleMockData } from './seattle-mock-data';
import { sfTimelineMockData } from './timeline-mock-data';

export const handlers = [
  rest.get('https://api.tomorrow.io/v4/timelines', (req, res, ctx) => {
    const location = req.url.searchParams.get('location');
    let data;

    // SF
    switch (location) {
      // SF
      case '37.7749295,-122.4194155': {
        data = sfTimelineMockData;
        break;
      }
      // Seattle
      case '47.6062095,-122.3320708': {
        data = seattleMockData;
        break;
      }
      default: {
        data = sfTimelineMockData;
        break;
      }
    }

    return res(ctx.json(data));
  }),
];
