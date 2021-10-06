import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const TrickPage = function() {
  return(
    <React.Fragment>
      <Header />
      <div className={`container`}>
        Chua co noi dung
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default TrickPage;
