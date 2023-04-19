import { useEffect } from "react";
import { awesomeReducer } from "./awesomeReducer";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { useParams } from "react-router-dom";

export const useFetchEpisodes = () => {
  const { ENUMS, dispatch, state } = awesomeReducer();
  const params = useParams();

  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${params.podcastId}&media=podcast&entity=podcastEpisode`,
  )}`;

  const getFetch = async () => {
    const resp = await fetch(url);
    const data = await resp.json();

    dispatch({ type: ENUMS.SET_EPISODES, payload: data });
    setLocalStorage(`podcastDetail${params.podcastId}`, data, 86400000);
  };

  useEffect(() => {
    try {
      if (getLocalStorage(`podcastDetail${params.podcastId}`)) {
        dispatch({
          type: ENUMS.SET_EPISODES,
          payload: getLocalStorage(`podcastDetail${params.podcastId}`),
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
    episodesData: state.episodes,
    loadingEpisodes: state.loadingEpisodes,
    errorEpisodes: state.error,
  };
};
