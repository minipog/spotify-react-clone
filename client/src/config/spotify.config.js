const spotifyConfig = {
    AUTH_URI: 'https://accounts.spotify.com/authorize',
    CLIENT_ID: 'YOUR_CLIENT_ID',
    RESPONSE_TYPE: 'code',
    REDIRECT_URI: 'http://localhost:3000',
    SCOPES: [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-library-read',
        'user-library-modify',
        'user-read-playback-state',
        'user-modify-playback-state',
    ],
    makeAuthURI() {
        return `${this.AUTH_URI}?client_id=${this.CLIENT_ID}&response_type=${this.RESPONSE_TYPE}&redirect_uri=${
            this.REDIRECT_URI
        }&scope=${this.SCOPES.join('%20')}`;
    },
};

export default spotifyConfig;
