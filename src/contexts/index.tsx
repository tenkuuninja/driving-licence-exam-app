import React, { createContext, Dispatch, useReducer } from 'react';

interface IContextState {
  isDarkMode: boolean
}

interface IAction {
  toggleDarkMode?: () => void
}

enum Types {
  ToggleDarkMode = 'ToggleDarkMode',
}

type Action = { 
  type: string
  // payload?: any
} 

let reducer = (state: IContextState, action: Action) => {
  switch (action.type) {
    case Types.ToggleDarkMode:
      return { ...state, isDarkMode: !state.isDarkMode }
    default:
      return state;
  }
}

const actions = (dispatch: Dispatch<Action>) => ({
  toggleDarkMode() {
    if (localStorage.getItem('dark-mode') === 'on') {
      localStorage.setItem('dark-mode', 'off');
    } else {
      localStorage.setItem('dark-mode', 'on');
    }
    dispatch({ type: Types.ToggleDarkMode })
  }
});

const initialState = {
  isDarkMode: localStorage.getItem('dark-mode') === 'on'
}

const AppContext = createContext<[IContextState, IAction]>([initialState, {}]);

function AppContextProvider({ children }: { children: JSX.Element }) {
  let [state, dispatch] = useReducer(reducer, initialState);
  let setState: IAction = actions(dispatch);
  return(
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
