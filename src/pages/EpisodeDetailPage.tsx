import { PodcastDetail } from "../components/PodcastDetail";
import { useParams } from "react-router-dom";
import { EpisodeDetail } from "../components/EpisodeDetail";
import { useFetchPodcasts } from "../hooks/useFetchPodcasts";
import { useFetchEpisodes } from "../hooks/useFetchEpisodes";

export const EpisodeDetailPage = () => {
  const params = useParams();

  const { podcastsData, errorPodcasts, loadingPodcasts } = useFetchPodcasts();
  const { episodesData, errorEpisodes, loadingEpisodes } = useFetchEpisodes();

  if (errorPodcasts || errorEpisodes) {
    return <div className="grid text-5xl place-items-center">ERROR</div>;
  }
  return (
    <section className="grid grid-cols-[1fr_3fr] gap-20 m-5">
      <div className="shadow-xl span-2">
        {loadingPodcasts ? (
          <p>LOADING...</p>
        ) : (
          <PodcastDetail
            data={podcastsData?.feed.entry}
            id={params.podcastId}
          />
        )}
      </div>
      <div className="grid p-6 pl-5 text-2xl shadow-xl h-fit">
        {loadingEpisodes ? (
          <p>LOADING...</p>
        ) : (
          <EpisodeDetail data={episodesData?.results} id={params.episodeId} />
        )}
      </div>
    </section>
  );
};
