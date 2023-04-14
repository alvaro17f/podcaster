import { createBrowserRouter } from "react-router-dom";

import { Layout } from "../layout/Layout";
import { HomePage } from "../pages/HomePage";
import { PodcastDetailPage } from "../pages/PodcastDetailPage";
import { EpisodeDetailPage } from "../pages/EpisodeDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/podcast/:podcastId",
        element: <PodcastDetailPage />,
      },
      {
        path: "/podcast/:podcastId/episode/:episodeId",
        element: <EpisodeDetailPage />,
      },
    ],
  },
]);
