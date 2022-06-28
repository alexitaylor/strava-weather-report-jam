import { setLevelRef } from '@testing-library/user-event/dist/types/utils';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useCityContext } from '../contexts/CityContext';
import { Cities, getCities } from './city.api';

const CitySearchStyled = styled.div`
  width: 600px;
  border: 1px solid gray;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.73);
  position: relative;
  margin-bottom: 2rem;

  input {
    width: 100%;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.73);
    padding: 10px 5px;
    box-sizing: border-box;
    outline: none;
  }
  ul::before {
    content: '';
  }

  ul {
    list-style-type: none;
    text-align: left;
    margin: 0;
    padding: 0;
    border-top: 1px solid gray;
    position: absolute;
    //top: 0;
    z-index: 99;
    background: white;
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
  }

  li {
    padding: 10px 5px;
    cursor: pointer;
  }

  li:hover {
    background: lightgray;
    text-decoration: underline;
  }
`;

const CitySearch = () => {
  const { setCity } = useCityContext();
  const [cities, setCities] = useState<Cities[]>([]);
  const [suggestions, setSuggestions] = useState<Cities[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    (async () => {
      const result = await getCities();
      setCities(result);
    })();
  }, []);

  const selectCity = ({
    city,
    state,
    longitude,
    latitude,
  }: {
    city: string;
    state: string;
    longitude: number;
    latitude: number;
  }) => {
    setSuggestions([]);
    setSearchText(`${city}, ${state}`);
    setCity({
      city,
      state,
      longitude,
      latitude,
    });
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    let suggestionsNew: Cities[] = [];
    const value = e.target.value;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      suggestionsNew = cities.filter((c) => regex.test(c.city) || regex.test(c.state));
    }

    setSearchText(value);
    setSuggestions(suggestionsNew);
  };

  return (
    <CitySearchStyled>
      <input value={searchText} onChange={onSearchChange} placeholder="Search city..." type="text" />
      <ul>
        {suggestions.map(({ city, state, longitude, latitude }) => (
          <li key={`${city}-${state}`} onClick={() => selectCity({ city, state, longitude, latitude })}>
            {city}, {state}
          </li>
        ))}
      </ul>
    </CitySearchStyled>
  );
};

export default CitySearch;
