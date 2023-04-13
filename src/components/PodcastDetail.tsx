export const PodcastDetail = ({ data, id }) => {
	const podcast = data.find((element) =>
		element.id.attributes["im:id"].includes(id),
	);

	return (
		<div className="grid grid-cols-1">
			<img
				src={podcast["im:image"][2].label}
				alt={`${podcast.title.label} picture`}
				className="place-self-center"
			/>
			<div className="mt-5 mb-2 border-b place-self-center border-gray-300 w-[80%]" />
			<p className="mx-6 font-bold">{podcast.title.label}</p>
			<p className="mx-6 italic">{podcast["im:artist"].label}</p>
			<div className="my-3 place-self-center border-b border-gray-300 w-[80%]" />
			<p className="mx-6 text-sm font-bold">Description:</p>
			<p className="mx-6 mb-5 text-sm text-justify">{podcast.summary.label}</p>
		</div>
	);
};
