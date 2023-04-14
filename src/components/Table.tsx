import { Link } from "react-router-dom";
import { millisFormat } from "../utils/millisFormat";

type Props = {
	data?: {
		trackId: string;
		trackName: string;
		releaseDate: string;
		trackTimeMillis: number;
	}[];
	id?: string;
};

export const Table = ({ data, id }: Props) => {
	return (
		<table className="w-full">
			<thead>
				<tr className="text-xl text-left border-b-4">
					<th>Title</th>
					<th>Date</th>
					<th>Duration</th>
				</tr>
			</thead>
			<tbody className="text-sm">
				{data?.map((episode, idx) => (
					<tr key={idx} className="h-10 border-b-2 odd:bg-gray-100">
						<td>
							<Link
								className="text-blue-500"
								to={`/podcast/${id}/episode/${episode.trackId}`}
							>
								{episode.trackName}
							</Link>
						</td>
						<td className="text-center">
							{new Date(episode.releaseDate).toLocaleDateString()}
						</td>
						<td className="text-center">
							{millisFormat(episode.trackTimeMillis)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
