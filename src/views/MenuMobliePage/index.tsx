import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Header from '../components/Header'
import { LearnMenu, ExamMenu } from '../components/Menu';
import { BiHomeAlt } from 'react-icons/bi';
import st from './menu.module.css';

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
        <div className={st.bc}>
          <Link to="/" >
            <BiHomeAlt className={st.icon} />
            <span>Trang chủ</span>
          </Link>
          <div>{title}</div>
        </div>
        {element}
      </div>
    </React.Fragment>
  );
}

export default MenuPage;
