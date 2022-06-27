import styled from 'styled-components';

import useWindowSize from '../hooks/useWindowSize.hook';

const Toast = styled.div`
  background: rgba(128, 90, 213, 0.8);
  color: white;
  display: block;
  font-size: large;
  font-weight: bold;
  left: 0;
  max-width: 250px;
  padding: 0.75rem 1rem;
  position: fixed;
  top: 0;
  z-index: 99999;
`;

export const ScreenWidthToast = () => {
  const { width } = useWindowSize();

  return <Toast>Window Width: {width}</Toast>;
};

export default ScreenWidthToast;
