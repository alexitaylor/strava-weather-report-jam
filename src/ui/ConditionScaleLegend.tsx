import classnames from 'classnames';
import { useMemo } from 'react';
import styled from 'styled-components';

import { useUserSettingsContext } from '../contexts/UserSettingsContext';
import { useWeatherContext } from '../contexts/WeatherContext';
import { WeatherIntervalsValues, WeatherTimelines } from '../models';
import { calculateWeatherCondition, ConditionScale } from '../service';

const ScaleLegendStyled = styled.div`
  width: 500px;
  .scale-legend {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .condition {
      flex: 1;
      text-align: center;
    }
  }

  .condition-indicator {
    height: 20px;
    margin-bottom: 0.75rem;
  }
  .label {
    font-size: 1.25rem;
  }

  .active {
    border: 2px solid black;
    transform: scale(1.1);
  }
`;

const ConditionScaleLegend = () => {
  // Get Weather Condition
  const { state } = useWeatherContext();

  return (
    <ScaleLegendStyled>
      <h3>Weather Condition Scale</h3>
      <div className="scale-legend">
        {Object.values(ConditionScale)
          .filter((c) => c.value !== 'default')
          .map(({ value, bgStyle }) => (
            <div className="condition" key={value}>
              <div
                className={classnames('condition-indicator', bgStyle, {
                  active: value === state?.weatherCondition?.value,
                })}
              />
              <span className="label">{value}</span>
            </div>
          ))}
      </div>
    </ScaleLegendStyled>
  );
};

export default ConditionScaleLegend;
