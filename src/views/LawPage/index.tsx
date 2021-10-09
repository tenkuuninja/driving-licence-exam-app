import React, { useState, useEffect } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { getLawByVehicleCodeAndTopicId, getLawTopic } from '../../data';
import { ILaw, ILawBookmark, ITopic } from '../../interface';
import Breadcrumb from '../components/Breadcrumb';
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
        <Breadcrumb
          item={[
            { label: 'Trang chủ', icon: <BiHomeAlt />, url: '/' },
            { label: 'Luật giao thông' },
          ]}
        />
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
            <p><span className={st.label}>Hành vi:</span> {law.violation}</p>
            <p><span className={st.label}>Đối tượng:</span> {law.entities}</p>
            <p><span className={st.label}>Hình phạt:</span> {law.penalties}</p>
            {law.additionalPenalties && <p><span className={st.label}>Hình phạt bổ sung:</span> {law.additionalPenalties}</p>}
            {law.remedial && <p><span className={st.label}>Khắc phục hậu quả:</span> {law.remedial}</p>}
            {law.note && <p><span className={st.label}>Ghi chú:</span> {law.note}</p>}
            {law.bookmarks.map((bookmark: ILawBookmark, i) => <Link to={`/can-cu-phap-ly.html#${bookmark.code}`} key={i}>
              <p className={st.bookmark}><i>{bookmark.text}</i></p>
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
