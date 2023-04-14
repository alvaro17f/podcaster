import { useEffect, useReducer } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { PodcastDetail } from "../components/PodcastDetail";
import { useParams } from "react-router-dom";
import { EpisodeDetail } from "../components/EpisodeDetail";

enum EDP {
  SET_PODCASTS = "SET_PODCASTS",
  SET_EPISODES = "SET_EPISODES",
  SET_ERROR = "SET_ERROR",
}

export const EpisodeDetailPage = () => {
  const initialState = {
    podcasts: null,
    episodes: null,
    error: null,
    loadingPodcasts: true,
    loadingEpisodes: true,
  };

  const reducer = (state: any, action: { type: any; payload: any }) => {
    switch (action.type) {
      case EDP.SET_PODCASTS:
        return { ...state, podcasts: action.payload, loadingPodcasts: false };
      case EDP.SET_EPISODES:
        return { ...state, episodes: action.payload, loadingEpisodes: false };
      case EDP.SET_ERROR:
        return {
          ...state,
          error: action.payload,
          loadingPodcasts: false,
          loadingEpisodes: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const params = useParams();

  useEffect(() => {
    try {
      if (getLocalStorage("podcasts")) {
        dispatch({
          type: EDP.SET_PODCASTS,
          payload: getLocalStorage("podcasts"),
        });
      } else {
        fetch(
          `https://api.allorigins.win/raw?url=${encodeURIComponent(
            "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
          )}`,
        )
          .then((response) => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
          })
          .then((data) => {
            dispatch({ type: EDP.SET_PODCASTS, payload: data });
            setLocalStorage("podcasts", data, 86400000);
          });
      }

      if (getLocalStorage(`podcastDetail${params.podcastId}`)) {
        dispatch({
          type: EDP.SET_EPISODES,
          payload: getLocalStorage(`podcastDetail${params.podcastId}`),
        });
      } else {
        fetch(
          `https://api.allorigins.win/raw?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${params.podcastId}&media=podcast&entity=podcastEpisode`,
          )}`,
        )
          .then((response) => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
          })
          .then((data) => {
            dispatch({ type: EDP.SET_EPISODES, payload: data });
            setLocalStorage(`podcastDetail${params.podcastId}`, data, 86400000);
          });
      }
    } catch (e) {
      dispatch({
        type: EDP.SET_ERROR,
        payload: e,
      });
      console.log(e);
    }
  }, []);

  if (state.error) {
    return <div className="grid text-5xl place-items-center">ERROR</div>;
  }
  return (
    <>
      <section className="grid grid-cols-[1fr_3fr] gap-20 m-5">
        <div className="shadow-xl span-2">
          {state.loadingPodcasts ? (
            <p>LOADING...</p>
          ) : (
            <PodcastDetail
              data={state.podcasts?.feed.entry}
              id={params.podcastId}
            />
          )}
        </div>
        <div className="grid p-6 pl-5 text-2xl shadow-xl h-fit">
          {state.loadingEpisodes ? (
            <p>LOADING...</p>
          ) : (
            <EpisodeDetail
              data={state.episodes?.results}
              id={params.episodeId}
            />
          )}
        </div>
      </section>
    </>
  );
};
