import React from 'react';
import Feed from '../../components/Feed/Feed';
import './HomePage.css';


const HomePage = () => {


  return (
    <div className="home-page">
      {/* UNIQUEMENT le Feed - pas de sidebar */}
      <main className="main-content">
        <Feed />
      </main>
    </div>
  );
};

export default HomePage;

