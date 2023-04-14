import { useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { PodcastDetail } from "../components/PodcastDetail";
import { useParams } from "react-router-dom";
import { EpisodeDetail } from "../components/EpisodeDetail";
import { useFetch } from "../hooks/useFetch";
import { awesomeReducer } from "../hooks/awesomeReducer";

export const EpisodeDetailPage = () => {
  const { ENUMS, dispatch, state } = awesomeReducer();

  const params = useParams();

  const { data: podcastData, setShouldFetch: fetchPodcasts } = useFetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
    )}`,
  );

  const { data: episodeData, setShouldFetch: fetchEpisodes } = useFetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${params.podcastId}&media=podcast&entity=podcastEpisode`,
    )}`,
  );

  useEffect(() => {
    try {
      if (getLocalStorage("podcasts")) {
        dispatch({
          type: ENUMS.SET_PODCASTS,
          payload: getLocalStorage("podcasts"),
        });
      } else {
        fetchPodcasts(true);
        podcastData && (
          dispatch({ type: ENUMS.SET_PODCASTS, payload: podcastData }),
          setLocalStorage("podcasts", podcastData, 86400000))
      }

      if (getLocalStorage(`podcastDetail${params.podcastId}`)) {
        dispatch({
          type: ENUMS.SET_EPISODES,
          payload: getLocalStorage(`podcastDetail${params.podcastId}`),
        });
      } else {
        fetchEpisodes(true);
        episodeData && (
          dispatch({ type: ENUMS.SET_EPISODES, payload: episodeData }),
          setLocalStorage(
            `podcastDetail${params.podcastId}`,
            episodeData,
            86400000,
          ));
      }
    } catch (e) {
      dispatch({
        type: ENUMS.SET_ERROR,
        payload: e,
      });
      console.log(e);
    }
  }, [podcastData, episodeData]);

  if (state.error) {
    return <div className="grid text-5xl place-items-center">ERROR</div>;
  }
  return (
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
  );
};
