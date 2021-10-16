import React from'react';
import { Link } from 'react-router-dom';
import { GiPencilRuler } from 'react-icons/gi';
import { AiOutlineSmile, AiOutlineCar } from 'react-icons/ai';
import { BiWrench, BiTime } from 'react-icons/bi';
import { IoTrailSignOutline } from 'react-icons/io5';
import { RiErrorWarningLine } from 'react-icons/ri';
import st from './menu.module.css';

const menu = [
  {
    text: 'Khái Niệm và quy tắc',
    url: '/hoc-ly-thuyet-chu-de-khai-niem-va-quy-tac.html',
    color: '#fd9644',
    icon: <GiPencilRuler />
  },
  {
    text: 'Văn hoá đạo đức lái xe',
    url: '/hoc-ly-thuyet-chu-de-van-hoa-dao-duc-lai-xe.html',
    color: '#0fb9b1',
    icon: <AiOutlineSmile />
  },
  {
    text: 'Kỹ thuật lái xe',
    url: '/hoc-ly-thuyet-chu-de-ky-thuat-lai-xe.html',
    color: '#fc5c65',
    icon: <BiWrench />
  },
  {
    text: 'Biển báo đường bộ',
    url: '/hoc-ly-thuyet-chu-de-bien-bao-duong-bo.html',
    color: '#a55eea',
    icon: <IoTrailSignOutline />
  },
  {
    text: 'Sa hình',
    url: '/hoc-ly-thuyet-chu-de-sa-hinh.html',
    color: '#2d98da',
    icon: <AiOutlineCar />
  },
  {
    text: 'Các câu điểm liệt',
    url: '/on-tap-cau-diem-liet.html',
    color: '#eb3b5a',
    icon: <RiErrorWarningLine />
  },
]

export const LearnMenu = () => {
  return(
    <>
      <p className={st.title}>Học lý thuyết</p>
      <ul className={st['list-topic']}>
        {menu.map((item, i) => <li key={i}>
          <Link to={item.url} className={st.paper}  style={{ color: item.color }}>
            <span className={`${st.icon}`}>{item.icon}</span>
            <p>{item.text}</p>
          </Link>
        </li>)}
      </ul>
    </>
  );
}

export const ExamMenu = () => {
  let items: any[] = []
  for (let i=1; i<=8; i++) {
    items.push(<li key={i}>
      <Link to={`/thi-sat-hach-de-so-${i}.html`} className={st.paper} >
        <div className={`${st.icon}`}>{<BiTime />}</div>
        <p>Đề số {i}</p>
      </Link>
    </li>)
  }
  return(
    <>
      <p className={st.title}>Thi sát hạch</p>
      <ul className={st['list-item']}>
        {items}
      </ul>
    </>
  );
}
