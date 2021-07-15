import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import 'semantic-ui-css/semantic.min.css';
import './styles/app.css';

const authCode = new URLSearchParams(window.location.search).get('code');

const App = () => <div className="app">{authCode ? <Dashboard code={authCode} /> : <Login />}</div>;

export default App;
