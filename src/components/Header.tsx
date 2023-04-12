import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<header className="flex items-center h-20 pl-5 mb-10 text-4xl text-blue-400 shadow-md">
			<Link to="/">Podcaster</Link>
		</header>
	);
};
