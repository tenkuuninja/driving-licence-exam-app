import React from 'react';
import { AppContext } from '../../../contexts';
import { FiSun, FiMoon } from 'react-icons/fi';
import st from './toggledark.module.css';

const ToggleDarkMode = function() {
  const [{ isDarkMode }, { toggleDarkMode }] = React.useContext(AppContext);
  return(
    <div className={st.toggle} onClick={toggleDarkMode} >
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </div>
  );
}

export default ToggleDarkMode;
