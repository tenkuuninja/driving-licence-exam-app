import React, { Suspense } from 'react';
import './App.css';
import Routes from '../routes';
import Loading from '../views/components/Loading';

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
