import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <>
      <p className="isually-hidden">Loading</p>
      <div className="lds-ripple"><div></div><div></div></div>
    </>
  );
}

export default LoadingScreen;
