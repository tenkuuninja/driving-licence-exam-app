import React, { useState } from 'react';
import { RiMenu3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ToggleDarkMode from '../ToggleDarkMode';
import st from './header.module.css'

const Header = function() {
  const [isOpenSideBar, setOpenSideBar] = useState<boolean>(false);

  return(
    <header className={`${st.wrapper}`}>
      <div className="mobile-only">
        <div className={st['sidebar-trigger']} onClick={() => setOpenSideBar(true)}>
          <RiMenu3Line />
        </div>
        <div className={`${st['sidebar-mask']} ${isOpenSideBar && st.active}`} onClick={() => setOpenSideBar(false)}></div>
        <div className={`${st['sidebar-content']} ${isOpenSideBar && st.active}`}>
          <div className={st.close} onClick={() => setOpenSideBar(false)}>
            <span>Quay lại</span>
          </div>
          <Link to="/bien-bao-giao-thong.html">
            <span>Biển báo giao thông</span>
          </Link>
          <Link to="/luat-duong-bo.html">
            <span>Luật đường bộ</span>
          </Link>
          <Link to="/can-cu-phap-ly.html">
            <span>Nghị định 100</span>
          </Link>
          <Link to="/meo-thi-ket-qua-cao.html">
            <span>Mẹo thi</span>
          </Link>
        </div>
      </div>
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
          <Link to="/bien-bao-giao-thong.html">
            <span>Biển báo giao thông</span>
          </Link>
        </div>
        <div className={`desktop-only`}>
          <Link to="/luat-duong-bo.html">
            <span>Luật đường bộ</span>
          </Link>
        </div>
        <div className={`desktop-only`}>
          <Link to="/can-cu-phap-ly.html">
            <span>Nghị định 100</span>
          </Link>
        </div>
        <div className={`desktop-only`}>
          <Link to="/meo-thi-ket-qua-cao.html">
            <span>Mẹo thi</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
