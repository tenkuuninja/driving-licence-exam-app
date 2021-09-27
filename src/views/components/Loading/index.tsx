import React from 'react';
import st from './loading.module.css';

const Loading = () => {
  return <div className={st.wrapper}>
    <div className={`${st['lds-roller']}`}>
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
  </div>
} 

export default Loading;
