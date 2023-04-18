import { rest } from "msw";
import PodcastsMock from "./responses/PodcastsMock.json";
import EpisodesMock from "./responses/EpisodesMock.json";

const baseURL = "https://api.allorigins.win/raw";

export const handlers = [
  rest.get(baseURL, (req, res, ctx) => {
    const urlParam = req.url.searchParams.get("url");
    let response;

    if (
      urlParam ===
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    ) {
      response = PodcastsMock;
    } else if (
      urlParam ===
      "https://itunes.apple.com/lookup?id=1535809341&media=podcast&entity=podcastEpisode"
    ) {
      response = EpisodesMock;
    }

    return res(ctx.status(200), ctx.json(response));
  }),
];
