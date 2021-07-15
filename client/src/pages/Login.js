import spotifyConfig from '../config/spotify.config';
import { Button } from 'semantic-ui-react';

const Login = () => (
    <Button circular color="green" className="btn-login" size="massive" href={spotifyConfig.makeAuthURI()}>
        Sign in with Spotify
    </Button>
);

export default Login;
