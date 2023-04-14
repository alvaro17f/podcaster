import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [state, setState] = useState({
    data: undefined,
    isLoading: true,
    hasError: undefined,
  });
  const getFetch = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    const resp = await fetch(url);
    const data = await resp.json();

    setState({
      data,
      isLoading: false,
      hasError: undefined,
    });
  };

  useEffect(() => {
    if (shouldFetch) {
      getFetch();
    }
    return setShouldFetch(false)
  }, [url, shouldFetch]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    setShouldFetch
  };
};