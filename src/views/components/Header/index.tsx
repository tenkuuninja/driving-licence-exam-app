import React from 'react';
import st from './header.module.css'

const Header = function() {
  return(
    <header className={`${st.wrapper}`}>
      <div className={`${st.logo}`}>
        <img src="/images/logo.png" />
        <span className={`${st['text-logo']}`}>Motovjppro</span>
      </div>
      <div className={st['header-right']}>
        <div>
          <span>Trống trải vl</span>
        </div>
        <div>
          <span>Liên hệ</span>
        </div>
        <div>
          <span>Về chúng tôi</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
