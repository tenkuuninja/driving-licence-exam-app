import React from 'react';
import { FaFacebookF, FaTelegramPlane, FaTumblr } from 'react-icons/fa';
import { SiTinder } from 'react-icons/si';
import { Link } from 'react-router-dom';
import st from './footer.module.css';

const data = [
  {
    title: 'Danh mục',
    items: [
      { text: 'Biển báo giao thông', url: '/bien-bao-giao-thong.html' },
      { text: 'Luật đường bộ', url: '/luat-duong-bo.html' },
      { text: 'Căn cứ pháp lý', url: '/can-cu-phap-ly.html' },
      { text: 'Mẹo thi', url: '/meo-thi-ket-qua-cao.html' },
    ]
  },
  {
    title: 'Liên hệ',
    items: [
      { text: '(+84) XXXXXXXXXX', url: '#' },
      { text: 'vjppro@gmail.com', url: '#' },
      { text: 'Haloi, Dong Lao', url: '#' },
    ]
  },
  {
    title: 'Follow us',
    items: [
      { text: <><FaFacebookF /> Facebook</>, url: '#' },
      { text: <><FaTelegramPlane /> Telegram</>, url: '#' },
      { text: <><FaTumblr /> Tumblr</>, url: '#' },
      { text: <><SiTinder /> Tinder</>, url: '#' },
    ]
  },
]

const Footer = function() {
  return(
    <div className={st['dash-border']}>
      <div className="container">
        <div className={`${st.wrapper}`}>
          <div>
            <h3>Về chúng tôi</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem fugiat tempore, ipsa, modi facilis porro quasi neque nemo rerum pariatur suscipit quae consectetur! Soluta illo, nisi consequuntur praesentium quam omnis?</p>
          </div>
          {data.map((child, i) => <div key={i}>
            <h3>{child.title}</h3>
            {child.items.map((item: any, j: number) => <Link to={item.url} key={j}>
              {item.text}
            </Link>)}
          </div>)}
        </div>
      </div>
      <div className={`container ${st.copyright}`}>
        copyright @ {(new Date()).getFullYear()}
      </div>
    </div>
  );
}

export default Footer;
