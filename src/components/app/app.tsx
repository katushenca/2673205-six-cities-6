import MainPage from '../../pages/main-page/main-page.tsx';

type AppProps = {
  cardsCount : number;
}

function App({cardsCount} : AppProps) : JSX.Element {
  return (
    <MainPage cardsCount={cardsCount} />
  );
}

export default App;
