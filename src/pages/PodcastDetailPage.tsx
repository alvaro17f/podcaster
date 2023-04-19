import { PodcastDetail } from "../components/PodcastDetail";
import { useParams } from "react-router-dom";
import { Table } from "../components/Table";
import { useFetchPodcasts } from "../hooks/useFetchPodcasts";
import { awesomeReducer } from "../hooks/awesomeReducer";
import { useFetchEpisodes } from "../hooks/useFetchEpisodes";

export const PodcastDetailPage = () => {
  const params = useParams();

  const { podcastsData, errorPodcasts, loadingPodcasts } = useFetchPodcasts();
  const { episodesData, errorEpisodes, loadingEpisodes } = useFetchEpisodes();

  if (errorPodcasts || errorEpisodes) {
    return <div className="grid text-5xl place-items-center">ERROR</div>;
  }
  return (
    <section className="grid grid-cols-[1fr_3fr] gap-20 m-5">
      <div className="shadow-xl h-fit">
        {loadingPodcasts ? (
          <p>LOADING...</p>
        ) : (
          <PodcastDetail
            data={podcastsData?.feed.entry}
            id={params.podcastId}
          />
        )}
      </div>
      <div>
        <div className="flex items-center h-16 pl-5 text-2xl font-bold shadow-xl">
          {loadingEpisodes ? (
            <p>LOADING...</p>
          ) : (
            <p>EPISODES: {episodesData?.results.length}</p>
          )}
        </div>

        <div className="text-2xl shadow-xl p-7">
          {loadingEpisodes ? (
            <p>LOADING...</p>
          ) : (
            <Table data={episodesData?.results} id={params.podcastId} />
          )}
        </div>
      </div>
    </section>
  );
};
