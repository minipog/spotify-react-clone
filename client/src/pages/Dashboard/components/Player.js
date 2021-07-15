import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, songUri }) => {
    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [songUri]);

    return accessToken ? (
        <SpotifyPlayer
            token={accessToken}
            uris={songUri ? [songUri] : []}
            callback={(state) => {
                if (!state.isPlaying) setPlay(false);
            }}
            play={play}
            showSaveIcon
            initialVolume={0.5}
            styles={{
                activeColor: '#fff',
                bgColor: '#b0a9ca1c',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1cb954',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
            }}
        />
    ) : null;
};

export default Player;
