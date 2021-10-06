import React from 'react';
import { Link } from 'react-router-dom';
import ToggleDarkMode from '../ToggleDarkMode';
import st from './header.module.css'

const Header = function() {
  return(
    <header className={`${st.wrapper}`}>
        <Link to='/' >
      <div className={`${st.logo}`}>
          <img src="/images/logo.png" />
          <span className={`${st['text-logo']}`}>Motovjppro</span>
      </div>
        </Link>
      <div className={`${st['header-right']}`}>
        <div>
          <span><ToggleDarkMode /></span>
        </div>
        <div className={`desktop-only`}>
          <span>Trống trải vl thêm cái gì vào cho kín</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
