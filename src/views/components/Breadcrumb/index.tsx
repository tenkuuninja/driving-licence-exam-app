import React from 'react';
import { Link } from 'react-router-dom';
import st from './breadcrumb.module.css';

interface BreadcrumbProps {
  item: { label: string, icon?: string | JSX.Element, url?: string }[]
}

const Breadcrumb = (props: BreadcrumbProps) => {
  return(
    <ul className={st.wrapper}>
      {props.item.map((item, i) => <li key={i}>
        {item.url !== undefined ? 
          <Link to={item.url} >{item.icon || ''} {item.label}</Link> :
          <span >{item.icon || ''} {item.label}</span>
        }
      </li>)}
    </ul>
  );
}

export default Breadcrumb;
