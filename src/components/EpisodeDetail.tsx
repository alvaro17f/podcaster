import { ParseContent } from "../utils/purify";

type Props = {
  data?: {
    trackId: number;
    trackName: string;
    description: string;
    previewUrl: string;
  }[];
  id?: string;
};

export const EpisodeDetail = ({ data, id }: Props) => {
  const episode = data?.find((element) => element.trackId === Number(id));

  return (
    <div className="flex flex-col gap-5 mb-5">
      <p className="text-xl font-bold">{episode?.trackName}</p>
      <div className="text-sm italic whitespace-pre-wrap">
        <ParseContent content={episode?.description} />
      </div>
      <hr />
      <audio
        className="w-[90%] place-self-center"
        controls
        src={episode?.previewUrl}
      />
    </div>
  );
};
