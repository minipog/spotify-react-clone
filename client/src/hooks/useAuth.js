import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        (async () => {
            try {
                const {
                    data: { accessToken, refreshToken, expiresIn },
                } = await axios.post('http://localhost:3001/login', { code });

                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setExpiresIn(expiresIn);

                window.history.pushState({}, null, '/');
            } catch (err) {
                window.location = '/';
            }
        })();
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const refreshInterval = setInterval(async () => {
            try {
                const {
                    data: { accessToken, expiresIn },
                } = await axios.post('http://localhost:3001/refresh', { refreshToken });

                setAccessToken(accessToken);
                setExpiresIn(expiresIn);

                window.history.pushState({}, null, '/');
            } catch (err) {
                window.location = '/';
            }
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(refreshInterval);
    }, [refreshToken, expiresIn]);

    return accessToken;
};

export default useAuth;
