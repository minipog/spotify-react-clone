require('dotenv').config();
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(express.json());

try {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Express listening on port ${PORT}`));
} catch (err) {
    throw err;
}

const spotifyCredentials = {
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
};

app.post('/login', async ({ body: { code } }, res) => {
    try {
        const spotifyApi = new SpotifyWebApi(spotifyCredentials);
        const data = await spotifyApi.authorizationCodeGrant(code);

        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        });
    } catch (err) {
        res.sendStatus(400);
    }
});

app.post('/refresh', async ({ body: { refreshToken } }, res) => {
    try {
        const spotifyApi = new SpotifyWebApi({ ...spotifyCredentials, refreshToken });
        const data = await spotifyApi.refreshAccessToken();

        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        });
    } catch (err) {
        res.sendStatus(400);
    }
});
