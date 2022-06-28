export const getUvIndexValue = (uvIndex: number) => {
  if (uvIndex <= 2) {
    return 'Low';
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    return 'Moderate';
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    return 'High';
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    return 'Very High';
  } else if (uvIndex >= 11) {
    return 'Extreme';
  } else {
    return uvIndex ?? '--';
  }
};
