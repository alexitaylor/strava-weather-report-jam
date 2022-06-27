import { ChangeEvent, FormEvent, InputHTMLAttributes, useCallback, useReducer } from 'react';
import styled from 'styled-components';

import { useUserSettingsContext } from '../contexts/UserSettingsContext';
import { UserSettings } from '../models';
import Modal from './Modal';

const initState = {
  temperatureLow: 40,
  temperatureHigh: 80,
  precipitationChanceLow: 0,
  precipitationChanceHigh: 50,
  precipitationAmountLow: 0,
  precipitationAmountHigh: 3,
  windSpeedLow: 0,
  windSpeedHigh: 20,
};

function reducer(state: UserSettings, { field, value }: { field: string; value: number }) {
  return {
    ...state,
    [field]: value,
  };
}

const InputStyled = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.24rem;
    color: #494950;
    font-weight: 400;
    margin-bottom: 4px;
  }
`;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, value, type, name, onChange }: InputProps) => {
  return (
    <InputStyled>
      <label>{label}</label>
      <input value={value} type={type} name={name} onChange={onChange} />
    </InputStyled>
  );
};

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
`;

const WeatherPreference = () => {
  const { userSettings, setUserSettings } = useUserSettingsContext();
  const [state, dispatch] = useReducer(reducer, userSettings ?? initState);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({ field: e.target.name, value: Number.parseInt(e.target.value, 10) });
    },
    [dispatch]
  );
  const {
    temperatureLow,
    temperatureHigh,
    precipitationChanceLow,
    precipitationChanceHigh,
    precipitationAmountLow,
    precipitationAmountHigh,
    windSpeedLow,
    windSpeedHigh,
  } = state;

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserSettings(state);
  };

  return (
    <div>
      <Modal openButtonText="Open Weather Preference">
        <WeatherPreferenceStyled>
          <h2>Weather Preference</h2>
          <form onSubmit={handleOnSubmit}>
            {/* Temp Pref */}
            <div className="input-grouped">
              <Input
                label="Temperature Low"
                name="temperatureLow"
                type="number"
                value={temperatureLow}
                onChange={onChange}
              />
              <Input
                label="Temperature High"
                name="temperatureHigh"
                type="number"
                value={temperatureHigh}
                onChange={onChange}
              />
            </div>
            {/* Precipitation Chance Pref */}
            <div className="input-grouped">
              <Input
                label="Precipitation Chance Low"
                name="precipitationChanceLow"
                type="number"
                value={precipitationChanceLow}
                onChange={onChange}
              />
              <Input
                label="Precipitation Chance High"
                name="precipitationChanceHigh"
                type="number"
                value={precipitationChanceHigh}
                onChange={onChange}
              />
            </div>
            {/* Precipitation Amount Pref */}
            <div className="input-grouped">
              <Input
                label="Precipitation Amount Low"
                name="precipitationAmountLow"
                type="number"
                value={precipitationAmountLow}
                onChange={onChange}
              />
              <Input
                label="Precipitation Amount High"
                name="precipitationAmountHigh"
                type="number"
                value={precipitationAmountHigh}
                onChange={onChange}
              />
            </div>
            {/* Wind Speed Pref */}
            <div className="input-grouped">
              <Input
                label="Wind Speed Low"
                name="windSpeedLow"
                type="number"
                value={windSpeedLow}
                onChange={onChange}
              />
              <Input
                label="Wind Speed High"
                name="windSpeedHigh"
                type="number"
                value={windSpeedHigh}
                onChange={onChange}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </WeatherPreferenceStyled>
      </Modal>
    </div>
  );
};

export default WeatherPreference;
