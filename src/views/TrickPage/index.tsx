import React, { useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import * as data from './text';
import st from './trick.module.css';

const TrickPage = function() {
  const [type, setType] = useState<'theory'|'pratice'>('theory')

  return(
    <React.Fragment>
      <Header />
      <div className="container">
        <Breadcrumb
          item={[
            { label: 'Trang chủ', icon: <BiHomeAlt />, url: '/' },
            { label: 'Mẹo thi' },
          ]}
        />
        <h1 className={st.title}>Mẹo thi</h1>
        <div className={st.tab}>
          <span className={type==='theory' ? st.active : ''} onClick={() => setType('theory')}>Lý Thuyết</span>
          <span className={type==='pratice' ? st.active : ''} onClick={() => setType('pratice')}>Thực hành</span>
        </div>
        <div style={{ marginTop: '2rem' }}>
          {data[type].map((str: string, i: number) => {
            let re = /^<img:(.+)>$/g
            if(re.test(str)) {
              console.log(re.exec(str)?.[1], re.test(str), str.match(re))
              return <img className={st.image} src={re.exec(str)?.[1]} key={i} />
            } else {
              let classNames = [st.pa]
              if (/^\d\.\s/g.test(str)) classNames.push(st.bold)
              if (/^\w\.\s/g.test(str)) classNames.push(st.mt)
              if (/^\+\s/g.test(str)) classNames.push(st.pl)
              return <p className={classNames.join(' ')} key={i}>{str}</p>
            }
          })}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  );
}

export default TrickPage;
