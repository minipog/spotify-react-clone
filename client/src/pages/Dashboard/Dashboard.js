import 'dotenv/config';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Search from './components/Search';
import Songs from './components/Songs';
import Player from './components/Player';
import useAuth from '../../hooks/useAuth';

const spotifyApi = new SpotifyWebApi({ clientId: process.env.CLIENT_ID });

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);

    const [searchQuery, setSearchQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState();

    const onSearchChange = (e) => setSearchQuery(e.target.value);
    const onSongClick = (uri) => setCurrentSong(uri);

    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) return;
        if (!searchQuery) return setSongs([]);

        let apiRequestCancel = false;

        (async () => {
            try {
                const res = await spotifyApi.searchTracks(searchQuery);
                if (apiRequestCancel) return;

                setSongs(
                    res.body.tracks.items.map((track) => ({
                        artist: track.artists[0].name,
                        album: track.album.name,
                        title: track.name,
                        uri: track.uri,
                        img: track.album.images.reduce(
                            (smallest, image) => (image.height < smallest.height ? image : smallest),
                            track.album.images[0]
                        ).url,
                        length: (track.duration_ms / 60000).toFixed(2),
                    }))
                );
            } catch (err) {}
        })();

        return () => (apiRequestCancel = true);
    }, [searchQuery, accessToken]);

    return (
        <>
            <Search query={searchQuery} onChange={onSearchChange} />
            <div className="song-area">
                <Songs songs={songs} onSongClick={onSongClick} />
            </div>
            <Player accessToken={accessToken} songUri={currentSong} play={currentSong} />
        </>
    );
};

export default Dashboard;
