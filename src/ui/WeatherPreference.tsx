import { FormEvent, useCallback, useReducer } from 'react';
import styled from 'styled-components';

import { useUserSettingsContext } from '../contexts/UserSettingsContext';
import { UserSettings } from '../models';
// import Input from './Input';
import Modal from './Modal';
import RangeSlider from './RangeSlider';

const initState = {
  temperatureLow: 40,
  temperatureHigh: 80,
  precipitationProbabilityLow: 0,
  precipitationProbabilityHigh: 50,
  rainAccumulationLow: 0,
  rainAccumulationHigh: 3,
  windSpeedLow: 0,
  windSpeedHigh: 20,
};

function reducer(state: UserSettings, { field, value }: { field: string; value: number }) {
  return {
    ...state,
    [field]: value,
  };
}

const WeatherPreferenceStyled = styled.div`
  width: 100%;

  .input-grouped {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;

    div {
      flex: 1;
    }

    div:first-child {
      margin-right: 24px;
    }
  }

  button {
    font-size: 1.2rem;
  }
`;

const WeatherPreference = () => {
  const { userSettings, setUserSettings } = useUserSettingsContext();
  const [state, dispatch] = useReducer(reducer, userSettings ?? initState);

  // const onChange = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     dispatch({ field: e.target.name, value: Number.parseInt(e.target.value, 10) });
  //   },
  //   [dispatch]
  // );

  const {
    temperatureLow,
    temperatureHigh,
    precipitationProbabilityLow,
    precipitationProbabilityHigh,
    rainAccumulationLow,
    rainAccumulationHigh,
    windSpeedLow,
    windSpeedHigh,
  } = state;

  const handleOnSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('state', state);
    setUserSettings(state);
  };

  const onChange = useCallback(
    (name: string, values: number[]) => {
      const [min, max] = values;
      const minName = `${name}Low`;
      const maxName = `${name}High`;
      dispatch({ field: minName, value: min });
      dispatch({ field: maxName, value: max });
    },
    [dispatch]
  );

  return (
    <div>
      <Modal openButtonText="Open Weather Preference">
        <WeatherPreferenceStyled>
          <h2>Weather Preference</h2>
          <RangeSlider
            label="Temperature"
            name="temperature"
            onChange={onChange}
            lowValue={temperatureLow}
            highValue={temperatureHigh}
          />
          <hr />
          <RangeSlider
            label="Precipitation Chance"
            name="precipitationProbability"
            onChange={onChange}
            lowValue={precipitationProbabilityLow}
            highValue={precipitationProbabilityHigh}
          />
          <hr />
          <RangeSlider
            label="Precipitation Amount"
            name="rainAccumulation"
            onChange={onChange}
            lowValue={rainAccumulationLow}
            highValue={rainAccumulationHigh}
          />
          <hr />
          <RangeSlider
            label="Wind Speed"
            name="windSpeed"
            onChange={onChange}
            lowValue={windSpeedLow}
            highValue={windSpeedHigh}
          />
          <hr />
          <button onClick={handleOnSubmit}>Submit</button>
          {/* TODO remove */}
          {/*<form onSubmit={handleOnSubmit}>*/}
          {/*  /!* Temp Pref *!/*/}
          {/*  <div className="input-grouped">*/}
          {/*    <Input*/}
          {/*      label="Temperature Low"*/}
          {/*      name="temperatureLow"*/}
          {/*      type="number"*/}
          {/*      value={temperatureLow}*/}
          {/*      onChange={onChange}*/}
          {/*    />*/}
          {/*    <Input*/}
          {/*      label="Temperature High"*/}
          {/*      name="temperatureHigh"*/}
          {/*      type="number"*/}
          {/*      value={temperatureHigh}*/}
          {/*      onChange={onChange}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  /!* Precipitation Chance Pref *!/*/}
          {/*  <div className="input-grouped">*/}
          {/*    <Input*/}
          {/*      label="Precipitation Chance Low"*/}
          {/*      name="precipitationProbabilityLow"*/}
          {/*      type="number"*/}
          {/*      value={precipitationProbabilityLow}*/}
          {/*      onChange={onChange}*/}
          {/*    />*/}
          {/*    <Input*/}
          {/*      label="Precipitation Chance High"*/}
          {/*      name="precipitationProbabilityHigh"*/}
          {/*      type="number"*/}
          {/*      value={precipitationProbabilityHigh}*/}
          {/*      onChange={onChange}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  /!* Precipitation Amount Pref *!/*/}
          {/*  <div className="input-grouped">*/}
          {/*    <Input*/}
          {/*      label="Precipitation Amount Low"*/}
          {/*      name="rainAccumulationLow"*/}
          {/*      type="number"*/}
          {/*      value={rainAccumulationLow}*/}
          {/*      onChange={onChange}*/}
          {/*    />*/}
          {/*    <Input*/}
          {/*      label="Precipitation Amount High"*/}
          {/*      name="rainAccumulationHigh"*/}
          {/*      type="number"*/}
          {/*      value={rainAccumulationHigh}*/}
          {/*      onChange={onChange}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  /!* Wind Speed Pref *!/*/}
          {/*  <div className="input-grouped">*/}
          {/*    <Input*/}
          {/*      label="Wind Speed Low"*/}
          {/*      name="windSpeedLow"*/}
          {/*      type="number"*/}
          {/*      value={windSpeedLow}*/}
          {/*      onChange={onChange}*/}
          {/*    />*/}
          {/*    <Input*/}
          {/*      label="Wind Speed High"*/}
          {/*      name="windSpeedHigh"*/}
          {/*      type="number"*/}
          {/*      value={windSpeedHigh}*/}
          {/*      onChange={onChange}*/}
          {/*    />*/}
          {/*  </div>*/}

          {/*  <button type="submit">Submit</button>*/}
          {/*</form>*/}
        </WeatherPreferenceStyled>
      </Modal>
    </div>
  );
};

export default WeatherPreference;
