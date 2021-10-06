import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { getLawByVehicleCodeAndTopicId, getLawTopic } from '../../data';
import { ILaw, ILawBookmark, ITopic } from '../../interface';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import st from './law.module.css';

const vehicle: ITopic[] = [
  { id: 1, text: '🛵 Xe máy' },
  { id: 2, text: '🚗 Ô tô' },
  { id: 3, text: '🛴 Khắc' }
]

const LawPage = function() {
  const [lawTopic, setLawTopic] = useState<ITopic[]>([]);
  const [currentTopicId, setCurrentTopicId] = useState<number>(1);
  const [currentVehicleCode, setCurrentVehicleCode] = useState<number>(1);
  const [laws, setLaws] = useState<ILaw[]>([]);
  console.log(laws)

  useEffect(function() {
    setLawTopic(getLawTopic());
  }, []);

  useEffect(function() {
    setLaws(getLawByVehicleCodeAndTopicId(currentVehicleCode, currentTopicId));
  }, [currentTopicId, currentVehicleCode]);

  return(
    <React.Fragment>
      <Header />
      <div className="container">
        <h1 className={`${st.title}`}>Luật giao thông</h1>
        <div className={`${st.select}`}>
          <Select 
            options={vehicle}
            value={vehicle.filter(i => i.id === currentVehicleCode)[0]}
            getOptionLabel={(e) => e.text}
            getOptionValue={(e) => `${e.id}`}
            onChange={(e) => setCurrentVehicleCode(e?.id || 1)}
          />
          <Select 
            options={lawTopic}
            value={lawTopic.filter(i => i.id === currentTopicId)[0]}
            getOptionLabel={(e) => e.text}
            getOptionValue={(e) => `${e.id}`}
            onChange={(e) => setCurrentTopicId(e?.id || 1)}
          />
        </div>
        <ul className={`${st['list-item']}`}>
          {laws.map((law: ILaw) => <li key={law.id}>
            <p>Hành vi: {law.violation}</p>
            <p>Đối tượng: {law.entities}</p>
            <p>Hình phạt: {law.penalties}</p>
            {law.additionalPenalties && <p>Hình phạt bổ sung: {law.additionalPenalties}</p>}
            {law.remedial && <p>Khắc phục hậu quả: {law.remedial}</p>}
            {law.note && <p>Ghi chú: {law.note}</p>}
            {law.bookmarks.map((bookmark: ILawBookmark, i) => <Link to={`/can-cu-phap-ly.html#${bookmark.code}`} key={i}>
              <p><i>{bookmark.text}</i></p>
            </Link>)}
          </li>)}
        </ul>
      </div>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  );
}

export default LawPage;
