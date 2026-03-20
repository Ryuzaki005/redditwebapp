import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // ← IMPORTANT
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/r/:subreddit/:postId" element={<PostDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;