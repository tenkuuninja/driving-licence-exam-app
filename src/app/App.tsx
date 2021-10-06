import React, { Suspense } from 'react';
import './App.css';
import Routes from '../routes';
import Loading from '../views/components/Loading';
import { AppContextProvider } from '../contexts';
import DarkModeProvider from './DarkModeProvider';

function App() {
  return (
    <React.Fragment>
      <AppContextProvider>
        <DarkModeProvider>
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
        </DarkModeProvider>
      </AppContextProvider>
    </React.Fragment>
  );
}

export default App;
