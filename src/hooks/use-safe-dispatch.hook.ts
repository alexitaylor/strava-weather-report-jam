import { Dispatch, useCallback, useEffect, useRef } from 'react';

/**
 * This is just a wrapper function over the dispatch,
 * we want to pass any arguments back to the actual dispatch and
 * when a component un-mounts we should no longer dispatch.
 * This tells a component that it is ok to still dispatch and prevents
 * memory leaks when the component un-mounts.
 *
 * Using `safeDispatch` prevents this error:
 * "Warning: Can’t perform a React state update on an unmounted component."
 *
 * This helps when we have async behavior where we call an async API call,
 * then based on the async response, we set the state. But if the component
 * unmounts before the API call resolves, we don't want to set the state.
 * */
const useSafeDispatch = (dispatch: Dispatch<any>) => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // @ts-ignore
  return useCallback((...args: any[]) => (mountedRef.current ? dispatch(...args) : () => {}), [dispatch]);
};

export default useSafeDispatch;
