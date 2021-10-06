import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { GiBlackBook } from 'react-icons/gi';
import { AiOutlineWarning } from 'react-icons/ai';
import { GoLaw } from 'react-icons/go';
import { DiCssTricks } from 'react-icons/di';
import { BiTestTube } from 'react-icons/bi';
import { TiTimes } from 'react-icons/ti';
import st from './home.module.css';
import Modal from '../components/Modal';
import { ExamMenu, LearnMenu } from '../components/Menu';
import Footer from '../components/Footer';


const MenuPage = function() {
  const [isOpenLearnMenuModal, setOpenLearnMenuModal] = useState<boolean>(false);
  const [isOpenExamMenuModal, setOpenExamMenuModal] = useState<boolean>(false);
  const menu = [
    { 
      text: 'Học lý thuyết', 
      icon: <GiBlackBook />, 
      color: '#e67e22',
      action: () => setOpenLearnMenuModal(true),
      screen: 'desktop-only'
    },
    { 
      text: 'Thi sát hạch', 
      icon: <BiTestTube />, 
      color: '#3498db',
      action: () => setOpenExamMenuModal(true),
      screen: 'desktop-only'
    },
    { 
      text: 'Học lý thuyết', 
      url: '/hoc-ly-thuyet.html', 
      icon: <GiBlackBook />, 
      color: '#e67e22' ,
      screen: 'mobile-only'
    },
    { 
      text: 'Thi sát hạch', 
      url: '/thi-sat-hach.html', 
      icon: <BiTestTube />, 
      color: '#3498db' ,
      screen: 'mobile-only'
    },
    { 
      text: 'Biển báo', 
      url: '/bien-bao-giao-thong.html', 
      icon: <AiOutlineWarning />, 
      color: '#e74c3c' ,
      screen: ''
    },
    { 
      text: 'Mẹo thi', 
      url: '/meo-thi-ket-qua-cao.html', 
      icon: <DiCssTricks />, 
      color: '#f39c12' ,
      screen: ''
    },
    { 
      text: 'Luật đường bộ', 
      url: '/luat-duong-bo.html', 
      icon: <GoLaw />, 
      color: '#9b59b6' ,
      screen: ''
    },
    { 
      text: 'Ôn tập câu sai', 
      url: '/on-tap-cau-sai.html', 
      icon: <TiTimes />, 
      color: '#1abc9c' ,
      screen: ''
    },
  ]
  return(
    <React.Fragment>
      <Header />
      <div className={`${st.banner}`}>
        <div className={`${st.mask}`}></div>
        <div className={`${st.content}`}>
          <p>Lorem ipsum dolor sit amet</p>
          <p style={{textAlign: 'right'}}>consectetur adipiscing elit</p>
        </div>
        {/* <img src="http://media.baophutho.vn/dataimages/2021/04/07/123-1617762316.jpg" alt="" /> */}
      </div>
      <div className={`container ${st.container}`}>
        <ul className={st['list-item']}>
          {menu.map((item, i) => <li key={i} className={item.screen}>
            {item.url !== undefined &&
              <Link to={item.url} className={st.paper}  style={{ color: item.color }}>
                <div className={`${st.icon}`}>{item.icon}</div>
                <h3>{item.text}</h3>
              </Link>
            }
            {item.url === undefined &&
              <div className={st.paper}  style={{ color: item.color }} onClick={item.action}>
                <div className={`${st.icon}`}>{item.icon}</div>
                <h3>{item.text}</h3>
              </div>
            }
          </li>)}
        </ul>
      </div>
      <Footer />
      <Modal 
        isOpen={isOpenLearnMenuModal}
        handleOutsideClick={() => setOpenLearnMenuModal(false)}
      >
        <div className={`${st['modal-paper']}`}>
          <div className={st['modal-content']}>
            <LearnMenu />
          </div>
          <div className={st['modal-action']} style={{paddingRight: '3rem'}}>
            <span className={st.close} onClick={() => setOpenLearnMenuModal(false)}>
              Đóng
            </span>
            {/* <span onClick={handleSubmit}>
              Đồng ý
            </span> */}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isOpenExamMenuModal}
        handleOutsideClick={() => setOpenExamMenuModal(false)}
      >
        <div className={`${st['modal-paper']}`}>
          <div className={st['modal-content']}>
            <ExamMenu />
          </div>
          <div className={st['modal-action']}>
            <span className={st.close} onClick={() => setOpenExamMenuModal(false)}>
              Đóng
            </span>
            {/* <span onClick={handleSubmit}>
              Đồng ý
            </span> */}
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default MenuPage;
