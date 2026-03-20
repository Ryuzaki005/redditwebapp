import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchPostsAsync } from '../../store/postsSlice';

import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
      dispatch(searchPostsAsync(searchTerm)); // Dispatch de la recherche
      setSearchTerm(''); // Optionnel : reset recherche après soumission
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    setSearchTerm(''); // Optionnel : reset recherche
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container" onClick={handleLogoClick}>
          <img 
            src="https://www.logo.wine/a/logo/Reddit/Reddit-Logomark-Color-Logo.wine.svg" 
            alt="Reddit" 
            className="logo-image"
          />
          <span className="logo-text">Reddit<span className="logo-accent">App</span></span>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Rechercher sur Reddit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <span role="img" aria-label="search">🔍</span>
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;