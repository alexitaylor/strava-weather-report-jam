export const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCompassDirection = (bearing: number) => {
  switch (Math.round(bearing / 22.5)) {
    case 1:
      return 'NNE';
    case 2:
      return 'NE';
    case 3:
      return 'ENE';
    case 4:
      return 'E';
    case 5:
      return 'ESE';
    case 6:
      return 'SE';
    case 7:
      return 'SSE';
    case 8:
      return 'S';
    case 9:
      return 'SSW';
    case 10:
      return 'SW';
    case 11:
      return 'WSW';
    case 12:
      return 'W';
    case 13:
      return 'WNW';
    case 14:
      return 'NW';
    case 15:
      return 'NNW';
    default:
      return 'N';
  }
};

/**
 * @function isDefined
 * @description returns whether or not a value is defined (not null or undefined)
 * @param {unknown} value
 * @return {boolean}
 */

export const isDefined = (value: unknown): boolean => typeof value !== 'undefined' && value !== null;
