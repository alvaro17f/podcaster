import { Link } from "react-router-dom";

export const Podcast = ({ podcasts }: { podcasts: any}) => {
	return (
		<Link
			to={`/podcast/${podcasts.id.attributes["im:id"]}`}
			className="relative grid w-full h-40 p-5 mb-56 rounded-lg shadow-md place-items-center"
		>
			<img
				className="absolute duration-200 ease-in-out rounded-full -top-36 hover:scale-125"
				src={podcasts["im:image"][2].label}
				alt={`${podcasts["im:artist"].label} picture`}
			/>
			<p className="text-center text-md">{podcasts.title.label}</p>
			<p className="text-xs text-gray-500">
				Author: {podcasts["im:artist"].label}
			</p>
		</Link>
	);
};
