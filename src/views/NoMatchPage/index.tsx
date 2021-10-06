import React from'react';
import { Link } from 'react-router-dom';
import st from './no-match.module.css';

const NoMatchPage = () => {
  return(  
    <div className={st.wrapper}>
      <div className={st.content}>
        <p className={st.title}>Ồ! Trang bạn đang truy cập không tồn tại</p>
        <img className={st.image} src="/images/dam-nhau.png" alt='' />
        <Link to='/' className={st.btn} >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NoMatchPage;
