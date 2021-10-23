import React from 'react';
import { AppContext } from '../contexts';


function DarkModeProvider(props: { children: JSX.Element }) {
  const [state] = React.useContext(AppContext);

  React.useEffect(function() {
    const { isDarkMode } = state;
    if (isDarkMode) {
      document.getElementById('root')?.classList.add('dark-mode')
    } else {
      document.getElementById('root')?.classList.remove('dark-mode')
    }
    // eslint-disable-next-line
  }, [state.isDarkMode]);

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default DarkModeProvider;
