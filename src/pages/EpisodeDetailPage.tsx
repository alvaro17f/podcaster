import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import { PodcastDetail } from "../components/PodcastDetail";
import { useParams } from "react-router-dom";
import { EpisodeDetail } from "../components/EpisodeDetail";

export const EpisodeDetailPage = () => {
	const [podcasts, setPodcasts] = useState();
	const [episodes, setEpisodes] = useState();
	const [error, setError] = useState();
	const [loadingPodcasts, setLoadingPodcasts] = useState(true);
	const [loadingEpisodes, setLoadingEpisodes] = useState(true);

	const params = useParams();

	useEffect(() => {
		setLoadingPodcasts(true);

		if (getLocalStorage("podcasts")) {
			setPodcasts(getLocalStorage("podcasts"));
			setLoadingPodcasts(false);
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
					setPodcasts(data);
					setLocalStorage("podcasts", data, 86400000);
				})
				.catch((e) => {
					console.log(e);
					setError(e);
				})
				.finally(() => setLoadingPodcasts(false));
		}
	}, []);

	useEffect(() => {
		setLoadingEpisodes(true);

		if (getLocalStorage(`podcastDetail${params.podcastId}`)) {
			setEpisodes(getLocalStorage(`podcastDetail${params.podcastId}`));
			setLoadingEpisodes(false);
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
					setEpisodes(data);
					setLocalStorage(`podcastDetail${params.podcastId}`, data, 86400000);
				})
				.catch((e) => {
					console.log(e);
					setError(e);
				})
				.finally(() => setLoadingEpisodes(false));
		}
	}, []);

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
			<section className="grid grid-cols-[1fr_3fr] gap-20 m-5">
				<div className="shadow-xl span-2">
					{loadingPodcasts ? (
						<p>LOADING...</p>
					) : (
						<PodcastDetail data={podcasts?.feed.entry} id={params.podcastId} />
					)}
				</div>
				<div className="grid pl-5 text-2xl shadow-xl">
					{loadingEpisodes ? (
						<p>LOADING...</p>
					) : (
						<EpisodeDetail data={episodes?.results} id={params.episodeId} />
					)}
				</div>
			</section>
		</>
	);
};
