import { useState } from 'react';
import { useRanger } from 'react-ranger';
import styled from 'styled-components';

import { generateRandomId } from '../utils';

const RangeSliderStyled = styled.div`
  margin-bottom: 2rem;

  .label {
    font-size: 1.24rem;
    color: #494950;
    font-weight: 400;
    margin-bottom: 8px;
  }
`;

const Track = styled.div`
  display: inline-block;
  height: 8px;
  width: 100%;
  //margin: 0 5%;
`;

const Tick = styled.div`
  :before {
    content: '';
    position: absolute;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    height: 5px;
    width: 2px;
    transform: translate(-50%, 0.7rem);
  }
`;

const TickLabel = styled.div`
  position: absolute;
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.5);
  top: 100%;
  transform: translate(-50%, 1.2rem);
  white-space: nowrap;
`;

interface SegmentProps {
  index: number;
}
// --n40-steel
// --y50-gold
// --orange-dark
// var(--brand-success)
//     --tw-bg-opacity: 1;
//     background-color: rgb(55 65 81/1);
const Segment = styled.div<SegmentProps>`
  background: ${(props) =>
    props.index === 0 ? '#dddddd' : props.index === 1 ? '#0284c7' : props.index === 2 ? '#dddddd' : '#ff6050'};
  height: 100%;
`;

interface HandleProps {
  active: boolean;
}

//background: #ff1a6b;
// #0369a1
// background: var(--brand-info);
// border: 2px solid var(--n70-gravel);
const Handle = styled.div<HandleProps>`
  background: #38bdf8;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  padding: 0.2rem;
  border-radius: 100%;
  border: 2px solid #164e63;
  font-size: 1rem;
  white-space: nowrap;
  color: white;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transform: ${(props) => (props.active ? 'translateY(-100%) scale(1.3)' : 'translateY(0) scale(0.9)')};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

interface Props {
  label: string;
  lowValue?: number;
  highValue?: number;
  name?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?(name: string, values: number[]): void;
}

const RangeSlider = ({ label, lowValue = 20, highValue = 20, name, onChange }: Props) => {
  const [values, setValues] = useState([lowValue, highValue]);

  const { getTrackProps, ticks, segments, handles } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values,
    onChange: (v) => {
      setValues(v);
      onChange?.(name as string, v);
    },
  });

  return (
    <RangeSliderStyled>
      <div className="label">{label}</div>
      <Track {...getTrackProps()}>
        {ticks.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()} key={generateRandomId()}>
            <TickLabel>{value}</TickLabel>
          </Tick>
        ))}
        {segments.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} key={generateRandomId()} />
        ))}
        {handles.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: 'none',
                border: 'none',
                background: 'transparent',
                outline: 'none',
              },
            })}
            key={generateRandomId()}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
    </RangeSliderStyled>
  );
};

export default RangeSlider;
