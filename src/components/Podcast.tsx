import { Link } from "react-router-dom";

export const Podcast = ({ data }) => {
	return (
		<Link
			to={`/podcast/${data.id.attributes["im:id"]}`}
			className="relative grid w-full h-40 p-5 mb-56 rounded-lg shadow-md place-items-center"
		>
			<img
				className="absolute rounded-full -top-36"
				src={data["im:image"][2].label}
				alt={`${data["im:artist"].label} picture`}
			/>
			<p className="text-center text-md">{data.title.label}</p>
			<p className="text-xs text-gray-500">Author: {data["im:artist"].label}</p>
		</Link>
	);
};
