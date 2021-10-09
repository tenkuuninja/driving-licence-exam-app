import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Header from '../components/Header'
import { LearnMenu, ExamMenu } from '../components/Menu';
import { BiHomeAlt } from 'react-icons/bi';
import st from './menu.module.css';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

const MenuPage = function() {
  const match = useRouteMatch();
  const [element, setElement] = useState<JSX.Element>(<></>);
  const [title, setTitle] = useState<string>('');

  useEffect(function() {
    if (match.path === '/hoc-ly-thuyet.html') {
      setElement(<LearnMenu />);
      setTitle('Học Lý thuyết')
    } else {
      setElement(<ExamMenu />);
      setTitle('Thi sát hạch')
    }
  }, [match.path]);

  return(
    <React.Fragment> 
      <Header />
      <div className={st.wrapper}>
        <Breadcrumb 
          item={[
            { label: 'Trang chủ', icon: <BiHomeAlt />, url: '/' },
            { label: title },
          ]}
        />
        {element}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default MenuPage;
