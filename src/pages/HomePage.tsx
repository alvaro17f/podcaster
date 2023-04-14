import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { Podcast } from "../components/Podcast";
import { awesomeReducer } from "../hooks/awesomeReducer";
import { useFetch } from "../hooks/useFetch";


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
  const { ENUMS, dispatch, state } = awesomeReducer()
  const [query, setQuery] = useState("");

  const search = (podcasts: Props) => {
    return podcasts?.filter(
      (podcasts) =>
        podcasts["im:artist"].label.toLowerCase().includes(query) ||
        podcasts.title.label.toLowerCase().includes(query),
    );
  };

  const { data: podcastData, setShouldFetch } = useFetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
    )}`,
  );

  useEffect(() => {
    if (getLocalStorage("podcasts")) {
      dispatch({ type: ENUMS.SET_PODCASTS, payload: getLocalStorage("podcasts") });
    } else {
      setShouldFetch(true);
      podcastData && (
        dispatch({ type: ENUMS.SET_PODCASTS, payload: podcastData }),
        setLocalStorage("podcasts", podcastData, 86400000))
    }
  }, [podcastData]);


  if (state.loadingPodcasts) {
    return <div className="grid text-5xl place-items-center">LOADING...</div>;
  }
  if (state.error) {
    return <div className="grid text-5xl place-items-center">ERROR</div>;
  }

  return (
    <section>
      <div className="flex justify-end gap-3 pt-5 pr-5 flex-nowrap">
        <div className="p-2 text-3xl text-white bg-blue-400 rounded-xl">
          {state.podcasts?.feed.entry.length}
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
        {search(state.podcasts?.feed.entry)?.map((podcasts, idx) => (
          <Podcast key={idx} podcasts={podcasts} />
        ))}
      </div>
    </section>
  );
};
