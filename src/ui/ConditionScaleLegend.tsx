import classnames from 'classnames';
import styled from 'styled-components';

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

const conditions = {
  low: {
    value: 'Low',
    colorStyle: 'has-low-color',
    bgStyle: 'has-low-bg',
    description: '',
  },
  moderate: {
    value: 'Moderate',
    colorStyle: 'has-low-color',
    bgStyle: 'has-moderate-bg',
    description: '',
  },
  high: {
    value: 'High',
    colorStyle: 'has-high-color',
    bgStyle: 'has-high-bg',
    description: '',
  },
  veryHigh: {
    value: 'Very high',
    colorStyle: 'has-very-high-color',
    bgStyle: 'has-very-high-bg',
    description: '',
  },
  extreme: {
    value: 'Extreme',
    colorStyle: 'has-extreme-color',
    bgStyle: 'has-extreme-bg',
    description: '',
  },
};

const ConditionScaleLegend = () => {
  return (
    <ScaleLegendStyled>
      <h3>Weather Condition Scale</h3>
      <div className="scale-legend">
        {Object.values(conditions).map(({ value, colorStyle, bgStyle }) => (
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
