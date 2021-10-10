import React, { useState, useEffect } from 'react';
import { BiArrowToTop } from 'react-icons/bi';
import st from './scroll.module.css';

const ScrollToTop = function() {
  const [y, setY] = useState<number>(0);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(function() {
    function handleScrollEvent() {
      setY(window.scrollY);
    }
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [y]);

  return y < 1000 ? null : (<div 
    onClick={scrollToTop}
    className={st.button}
  >
    <BiArrowToTop />
  </div>);
}

export default ScrollToTop;
