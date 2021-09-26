import React from'react';
import { Link } from 'react-router-dom';
import st from './menu.module.css';

const menu = [
  {
    text: 'Khái Niệm và quy tắc',
    url: '/hoc-ly-thuyet-chu-de-khai-niem-va-quy-tac.html',
    color: '',
    icon: ''
  },
  {
    text: 'Văn hoá đạo đức lái xe',
    url: '/hoc-ly-thuyet-chu-de-van-hoa-dao-duc-lai-xe.html',
    color: '',
    icon: ''
  },
  {
    text: 'Kỹ thuật lái xe',
    url: '/hoc-ly-thuyet-chu-de-ky-thuat-lai-xe.html',
    color: '',
    icon: ''
  },
  {
    text: 'Biển báo đường bộ',
    url: '/hoc-ly-thuyet-chu-de-bien-bao-duong-bo.html',
    color: '',
    icon: ''
  },
  {
    text: 'Sa hình',
    url: '/hoc-ly-thuyet-chu-de-sa-hinh.html',
    color: '',
    icon: ''
  },
  {
    text: 'Các câu điểm liệt',
    url: '/cac-cau-diem-liet',
    color: '',
    icon: ''
  },
]

export const LearnMenu = () => {
  return(
    <ul className={st['list-item']}>
      {menu.map((item, i) => <li key={i}>
        <Link to={item.url} className={st.paper}  style={{ color: item.color }}>
          <div className={`${st.icon}`}>{item.icon}</div>
          <h3>{item.text}</h3>
        </Link>
      </li>)}
    </ul>
  );
}

export const ExamMenu = () => {
  let items: any[] = []
  for (let i=1; i<=8; i++) {
    items.push(<li key={i}>
      <Link to={`/thi-sat-hach-de-so-${i}.html`} className={st.paper} >
        {/* <div className={`${st.icon}`}>{item.icon}</div> */}
        <h3>Đề số {i}</h3>
      </Link>
    </li>)
  }
  return(
    <ul className={st['list-item']}>
      {items}
    </ul>
  );
}
