import { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState(
    typeof window === 'undefined'
      ? { width: 0, height: 0 }
      : {
          width: window.innerWidth,
          height: window.innerHeight,
        }
  );

  useLayoutEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setSize({ width, height }), 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width: size.width,
    height: size.height,
  };
}

export default useWindowSize;
