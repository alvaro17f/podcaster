import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import { Podcast } from "../components/Podcast";

export const Home = () => {
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	const search = (data) => {
		return data.filter(
			(data) =>
				data["im:artist"].label.toLowerCase().includes(query) ||
				data.title.label.toLowerCase().includes(query),
		);
	};

	useEffect(() => {
		setLoading(true);

		if (getLocalStorage("data")) {
			setData(getLocalStorage("data"));
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
				.then((data) => {
					setData(data);
					setLocalStorage("data", data, 86400000);
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
		return (
			<>
				<div className="grid text-5xl place-items-center">ERROR</div>;
				<pre className="grid mt-5 place-items-center">{error}</pre>
			</>
		);
	}

	return (
		<>
			<div className="flex justify-end gap-3 pt-5 pr-5 flex-nowrap">
				<div className="p-2 text-3xl text-white bg-blue-400 rounded-xl">
					{data?.feed.entry.length}
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
				{search(data?.feed.entry).map((data, idx) => (
					<Podcast key={idx} data={data} />
				))}
			</div>
		</>
	);
};
