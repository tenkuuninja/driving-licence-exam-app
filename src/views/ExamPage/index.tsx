import React from 'react';
import { Link } from 'react-router-dom';

export default () => (<div>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    textAlign: 'center'
  }}>
    <p style={{
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1rem'
    }}>Chức năng đang trong thời gian phát triển</p>
    <img 
      src="https://s199.imacdn.com/ta/2018/08/13/f5dedc9a0aba2622_42d70e01b3b6a216_6932715341334693185710.jpg" 
      alt='' 
      style={{
        maxWidth: '95vw'
      }}
    />
    <Link to='/' >
      <div style={{
        padding: '.5rem 1.5rem',
        backgroundColor: 'var(--primary-color)',
        borderRadius: '.5rem',
        fontSize: '1.2rem',
        color: 'white',
        display: 'inline-block',
        marginTop: '1rem'
      }} >
        Quay lại trang chủ

      </div>
    </Link>
  </div>
</div>)

