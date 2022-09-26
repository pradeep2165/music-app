import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, ifFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const { data, ifFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });

  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
      </div>
      <div className="mt-5">
        {songData?.sections[1].type === "LYRICS" ? (
          songData?.sections[1].text.map((line, i) => {
            return (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            );
          })
        ) : (
          <p>Sorry, no lyrics found</p>
        )}
      </div>
      <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} />
    </div>
  );
};

export default SongDetails;
