import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { Podcast } from "../components/Podcast";

type Podcasts = {
	feed: {
		entry: any;
	};
};

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
	const [podcasts, setPodcasts] = useState<Podcasts>();
	const [error, setError] = useState<unknown>();
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	const search = (podcasts: Props) => {
		return podcasts?.filter(
			(podcasts) =>
				podcasts["im:artist"].label.toLowerCase().includes(query) ||
				podcasts.title.label.toLowerCase().includes(query),
		);
	};

	useEffect(() => {
		if (getLocalStorage("podcasts")) {
			setPodcasts(getLocalStorage("podcasts"));
			setLoading(false);
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
				.then((podcasts) => {
					setPodcasts(podcasts);
					setLocalStorage("podcasts", podcasts, 86400000);
				})
				.catch((e) => {
					console.log(e);
					setError(e);
				})
				.finally(() => setLoading(false));
		}
	}, []);

	if (loading) {
		return <div className="grid text-5xl place-items-center">LOADING...</div>;
	}
	if (error) {
		return <div className="grid text-5xl place-items-center">ERROR</div>;
	}

	return (
		<>
			<div className="flex justify-end gap-3 pt-5 pr-5 flex-nowrap">
				<div className="p-2 text-3xl text-white bg-blue-400 rounded-xl">
					{podcasts?.feed.entry.length}
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
				{search(podcasts?.feed.entry).map((podcasts, idx) => (
					<Podcast key={idx} podcasts={podcasts} />
				))}
			</div>
		</>
	);
};
