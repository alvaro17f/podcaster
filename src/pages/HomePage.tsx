import { useId, useState } from "react";
import { Podcast } from "../components/Podcast";
import { useFetchPodcasts } from "../hooks/useFetchPodcasts";

type Props = {
  "im:image": {
    label: string;
  }[];
  "im:artist": {
    label: string;
  };
  id: {
    attributes: {
      "im:id": string;
    };
  };
  title: {
    label: string;
  };
}[];

export const HomePage = () => {
  const uuid = useId();
  const [query, setQuery] = useState("");

  const search = (podcasts: Props) => {
    return podcasts?.filter(
      (podcasts) =>
        podcasts["im:artist"].label.toLowerCase().includes(query) ||
        podcasts.title.label.toLowerCase().includes(query),
    );
  };

  const { podcastsData, loadingPodcasts, errorPodcasts } = useFetchPodcasts();

  if (loadingPodcasts) {
    return <div className="grid text-5xl place-items-center">LOADING...</div>;
  }
  if (errorPodcasts) {
    return <div className="grid text-5xl place-items-center">ERROR</div>;
  }
  return (
    <section>
      <div className="flex justify-end gap-3 pt-5 pr-5 flex-nowrap">
        <div className="p-2 text-3xl text-white bg-blue-400 rounded-xl">
          {podcastsData?.feed?.entry.length}
        </div>
        <input
          type="search"
          name="search"
          placeholder="Filter podcasts..."
          className="p-2 border border-gray-200 rounded-xl focus:outline-gray-300"
          onChange={({ target }) => setQuery(target.value.toLocaleLowerCase())}
        />
      </div>

      <div className="grid grid-cols-4 gap-10 mx-10 mt-60 place-items-center">
        {search(podcastsData?.feed?.entry)?.map((podcasts, idx) => (
          <Podcast key={`${uuid}-${idx}`} podcasts={podcasts} />
        ))}
      </div>
    </section>
  );
};
