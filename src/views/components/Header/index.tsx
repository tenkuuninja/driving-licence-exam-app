import React from 'react';
import st from './header.module.css'

const Header = function() {
  return(
    <header className={`${st.wrapper}`}>
      <div className={`${st.logo}`}>
        <img src="/images/logo.png" />
        <span className={`${st['text-logo']}`}>Motovjppro</span>
      </div>
      <div>
      </div>
    </header>
  );
}

export default Header;
