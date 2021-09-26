import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { GiBlackBook } from 'react-icons/gi';
import { AiOutlineWarning } from 'react-icons/ai';
import { GoLaw } from 'react-icons/go';
import { DiCssTricks } from 'react-icons/di';
import { BiTestTube } from 'react-icons/bi';
import { TiTimes } from 'react-icons/ti';
import st from './menu.module.css';

const menu = [
  { 
    text: 'Học lý thuyết', 
    url: '/hoc-ly-thuyet.html', 
    icon: <GiBlackBook />, 
    color: '#e67e22' 
  },
  { 
    text: 'Thi sát hạch', 
    url: '/thi-sat-hach.html', 
    icon: <BiTestTube />, 
    color: '#3498db' 
  },
  { 
    text: 'Biển báo', 
    url: '/bien-bao-giao-thong.html', 
    icon: <AiOutlineWarning />, 
    color: '#e74c3c' 
  },
  { 
    text: 'Thục hành', 
    url: '/', 
    icon: <DiCssTricks />, 
    color: '#f39c12' 
  },
  { 
    text: 'Luật đường bộ', 
    url: '/luat-duong-bo.html', 
    icon: <GoLaw />, 
    color: '#9b59b6' 
  },
  { 
    text: 'Ôn tập câu sai', 
    url: '/on-tap-cau-sai.html', 
    icon: <TiTimes />, 
    color: '#1abc9c' 
  },
]

const MenuPage = function() {
  return(
    <React.Fragment>
      <Header />
      <div className={`${st.container}`}>
        <ul className={st['list-item']}>
        {menu.map((item, i) => <li key={i}>
          <Link to={item.url} className={st.paper}  style={{ color: item.color }}>
            <div className={`${st.icon}`}>{item.icon}</div>
            <h3>{item.text}</h3>
          </Link>
        </li>)}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default MenuPage;
