import classnames from 'classnames';
import styled from 'styled-components';

const StatStyled = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  justify-content: flex-end;

  .stat-label {
    font-size: 12px;
    line-height: 16px;
    color: #494950;
    font-weight: 300;
  }

  .stat-value {
    font-size: 20px;
    font-weight: 500;
    white-space: nowrap;
  }
`;

const Stat = ({ label, value, className }: { label: string; value: string | number; className?: string }) => (
  <StatStyled className={classnames('stat', className)}>
    <span className="stat-label">{label}</span>
    <div className="stat-value">{value}</div>
  </StatStyled>
);

export default Stat;
