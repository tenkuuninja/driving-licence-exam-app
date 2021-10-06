import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getSignalsByTypeCode, getSignalTopic } from '../../data';
import { ISign, ITopic } from '../../interface';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import st from './signal.module.css';

const SignPage = function() {
  const [signTopic, setSignTopic] = useState<ITopic[]>([]);
  const [currentTopicId, setCurrentTopicId] = useState<number>(1);
  const [signs, setSigns] = useState<ISign[]>([]);
  console.log(signs)

  useEffect(function() {
    setSignTopic(getSignalTopic());
  }, []);

  useEffect(function() {
    setSigns(getSignalsByTypeCode(currentTopicId));
  }, [currentTopicId]);

  return(
    <React.Fragment>
      <Header />
      <div className="container">
        <h1 className={`${st.title}`}>Biển báo giao thông</h1>
        <div>
          <Select 
            options={signTopic}
            value={signTopic.filter(i => i.id === currentTopicId)[0]}
            getOptionLabel={(e) => e.text}
            getOptionValue={(e) => `${e.id}`}
            onChange={(e) => setCurrentTopicId(e?.id || 1)}
            className={`${st.select}`}
          />
        </div>
        <ul className={`${st['list-item']}`}>
          {signs.map((sign: ISign) => <li key={sign.id}>
            <div className={`${st['item-image']}`}>
              <img src={sign.image} alt={sign.title} />
            </div>
            <div className={`${st['item-info']}`}>
              <h3 className={st['item-title']}>{sign.title}</h3>
              <p className={st['item-description']}>{sign.description}</p>
            </div>
          </li>)}
        </ul>
      </div>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  );
}

export default SignPage;
