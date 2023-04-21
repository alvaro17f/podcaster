import { useEffect } from "react";
import { awesomeReducer } from "./awesomeReducer";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const useFetchPodcasts = () => {
  const { ENUMS, dispatch, state } = awesomeReducer();

  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
  )}`;

  const getFetch = async () => {
    const resp = await fetch(url);
    const data = await resp.json();

    dispatch({ type: ENUMS.SET_PODCASTS, payload: data });
    setLocalStorage("podcasts", data, 86400000);
  };

  useEffect(() => {
    try {
      if (getLocalStorage("podcasts")) {
        dispatch({
          type: ENUMS.SET_PODCASTS,
          payload: getLocalStorage("podcasts"),
        });
      } else {
        getFetch();
      }
    } catch (e) {
      dispatch({
        type: ENUMS.SET_ERROR,
        payload: e,
      });
      console.log(e);
    }
  }, [url]);
  return {
    podcastsData: state.podcasts,
    loadingPodcasts: state.loadingPodcasts,
    errorPodcasts: state.error,
  };
};
