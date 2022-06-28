import classnames from 'classnames';
import styled from 'styled-components';

import { ConditionScale } from '../service';

const ScaleLegendStyled = styled.div`
  width: 500px;
  .scale-legend {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .condition {
      flex: 1;
      text-align: center;
    }
  }

  .condition-indicator {
    height: 20px;
  }
  .label {
    font-size: 1.25rem;
  }
`;

const ConditionScaleLegend = () => {
  return (
    <ScaleLegendStyled>
      <h3>Weather Condition Scale</h3>
      <div className="scale-legend">
        {Object.values(ConditionScale)
          .filter((c) => c.value !== 'default')
          .map(({ value, bgStyle }) => (
            <div className="condition" key={value}>
              <div className={classnames('condition-indicator', bgStyle)} />
              <span className="label">{value}</span>
            </div>
          ))}
      </div>
    </ScaleLegendStyled>
  );
};

export default ConditionScaleLegend;
