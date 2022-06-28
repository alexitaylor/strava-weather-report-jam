// interface Cities {
//   country: string;
//   name: string;
//   lat: string;
//   lng: string;
// }

export interface Cities {
  city: string;
  growth_from_2000_to_2013: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  state: string;
}

// const filterUSCities = (cities: Cities[]) => cities.filter((city) => city.country === 'US');

export const getCities = async (): Promise<Cities[]> => {
  //https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json
  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const rsp = await fetch(endpoint);
  return await rsp.json();
};
