import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';

type AppProps = {
    placesCount: number;
}

function App({placesCount}: AppProps): JSX.Element {
  return (
    <WelcomeScreen placesCount={placesCount} />
  );
}

export default App;
