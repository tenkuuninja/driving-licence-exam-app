import React, { createContext, useState } from 'react';

interface IContextState {
  isDarkMode: boolean
}

interface IAction {
  toggleDarkMode?: () => void
}

const initialState = {
  isDarkMode: localStorage.getItem('dark-mode') === 'on'
}

const AppContext = createContext<[IContextState, IAction]>([initialState, {}]);

function AppContextProvider({ children }: { children: JSX.Element }) {
  const [state, setState] = useState<IContextState>(initialState);

  const toggleDarkMode = () => {
    if (localStorage.getItem('dark-mode') === 'on') {
      localStorage.setItem('dark-mode', 'off');
    } else {
      localStorage.setItem('dark-mode', 'on');
    }
    setState(state => ({
      isDarkMode: !state.isDarkMode
    }));
  }

  return(
    <AppContext.Provider value={[state, { toggleDarkMode }]}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
