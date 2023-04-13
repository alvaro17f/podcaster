export const EpisodeDetail = ({ data, id }) => {
	const episode = data.find((element) => element.trackId === Number(id));

	return (
		<div className="flex flex-col gap-5 mb-5 whitespace-pre-wrap">
			<p className="text-xl font-bold">{episode.trackName}</p>
			<p className="text-sm">{episode.description}</p>
			<audio className="w-[90%] place-self-center" controls src={episode.previewUrl} />
		</div>
	);
};
