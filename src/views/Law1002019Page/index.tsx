import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { FaChevronLeft } from 'react-icons/fa';
import ScrollToTop from '../components/ScrollToTop';
import st from './law.module.css';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import { BiHomeAlt } from 'react-icons/bi';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

interface DataLaw {
  code: string
  text: string
}

const data: DataLaw[] = require('./text.json')

const top = [
  'Căn cứ Luật Tổ chức Chính phủ ngày 19 tháng 6 năm 2015;',
  'Căn cứ Luật Xử lý vi phạm hành chính ngày 20 tháng 6 năm 2012;',
  'Căn cứ Luật Giao thông đường bộ ngày 13 tháng 11 năm 2008;',
  'Căn cứ Luật Đường sắt ngày 16 tháng 6 năm 2017;',
  'Theo đề nghị của Bộ trưởng Bộ Giao thông vận tải;',
  'Chính phủ ban hành Nghị định quy định xử phạt vi phạm hành chính trong lĩnh vực giao thông đường bộ và đường sắt.'
];

const bot = [
  'Ban Bí thư Trung ương Đảng;',
  'Thủ tướng, các Phó Thủ tướng Chính phủ;',
  'Các bộ, cơ quan ngang bộ, cơ quan thuộc Chính phủ;',
  'HĐND, UBND các tỉnh, thành phố trực thuộc trung ương;',
  'Văn phòng Trung ương và các Ban của Đảng;',
  'Văn phòng Tổng Bí thư;',
  'Văn phòng Chủ tịch nước;',
  'Hội đồng Dân tộc và các Ủy ban của Quốc hội;',
  'Văn phòng Quốc hội;',
  'Tòa án nhân dân tối cao;',
  'Viện kiểm sát nhân dân tối cao;',
  'Kiểm toán Nhà nước;',
  'Ủy ban Giám sát tài chính Quốc gia;',
  'Ngân hàng Chính sách xã hội;',
  'Ngân hàng Phát triển Việt Nam;',
  'Ủy ban Trung ương Mặt trận Tổ quốc Việt Nam;',
  'Cơ quan trung ương của các đoàn thể;',
  'VPCP: BTCN, các PCN, Trợ lý TTg, TGĐ Cổng TTĐT, các Vụ, Cục, đơn vị trực thuộc, Công báo;',
  'Lưu: VT, CN (2).'
];

export default function () {
  const { hash } = useLocation();
  const history = useHistory();

  useEffect(function() {
    let element = document.getElementById(hash.replace('#', ''));
    element?.classList.add(st.active)
    window.scroll({top: (element?.offsetTop||0) - 100, left: 0, behavior: 'smooth' });
    return function() {
      element?.classList.remove(st.active)
    }
  }, [hash]);

  return(
    <React.Fragment>
      <Header />
      <div className={`${st.wrapper} container`}>
        <Breadcrumb 
          item={[
            { label: 'Trang chủ', icon: <BiHomeAlt />, url: '/' },
            { label: 'Luật đường bộ', url: '/luat-duong-bo.html' },
            { label: 'Căn cứ pháp lý' },
          ]}
        />
        <h1 className={`${st.title}`}>Căn cứ pháp lý</h1>
        <div className={st.content}>
          <table style={{ textAlign: 'center' }} >
            <tbody>
              <tr>
                <td width="223" valign="top">
                  <p><b>CHÍNH PHỦ<br/>-------</b></p>
                </td>
                <td width="367" valign="top">
                  <p><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>Độc lập - Tự do - Hạnh phúc <br/>---------------</b></p>
                </td>
              </tr>
              <tr>
                <td width="223" valign="top"><br/>
                  <p>Số: 100/2019/NĐ-CP</p>
                </td>
                <td width="367" valign="top"><br/>
                  <p><i>Hà Nội, ngày 30 tháng 12 năm 2019</i></p>
                </td>
              </tr>
            </tbody>
          </table>
          <br/><br/><br/>
          <p className={st.center}><b>NGHỊ ĐỊNH</b></p>
          <p className={st.center}>QUY ĐỊNH XỬ PHẠT VI PHẠM HÀNH CHÍNH TRONG LĨNH VỰC GIAO THÔNG ĐƯỜNG BỘ VÀ ĐƯỜNG SẮT</p>
          {top.map((item, i) => <p key={i}><i>{item}</i></p>)}
          <br/>
          {data.map((item, i) => item.code.length === 0 ? 
            <p key={i}>{item.text}</p> : 
            <p id={item.code} className={/^chuong_\d_name$/g.test(item.code) ? st.center : ''} key={i}>
              {/^(chuong_)|(dieu_)/g.test(item.code) ? <b>{item.text}</b> : item.text}
            </p>
          )}
          <table style={{ margin: '2rem 0' }} >
            <tbody>
              <tr>
                <td width="334" valign="top">
                  <p >&nbsp;</p>
                  <p >&nbsp;</p>
                  <p ><b><i>Nơi nhận:</i></b><br/>
                    <span style={{ fontSize: '.7rem' }} >
                      {bot.map((item, i) => <React.Fragment key={i}>
                        - {item}<br/>
                      </React.Fragment>)}
                    </span>
                  </p>
                </td>
                <td style={{textAlign: 'center'}}  width="256" valign="top">
                  <p ><b>TM. CHÍNH PHỦ<br/>THỦ TƯỚNG<br/><br/><br/><br/><br/>Nguyễn Xuân Phúc</b></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
      <ScrollToTop />
    </React.Fragment>
  );
}
