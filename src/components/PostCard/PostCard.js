import React from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/helpers';
import MediaRenderer from '../MediaRenderer/MediaRenderer';
import './PostCard.css';

const PostCard = ({ post }) => {
  const { id, title, score, num_comments, subreddit, author, created_utc, selftext } = post;
  
  // Si le MediaRenderer refuse de rendre quelque chose (retourne null), il y aura peut-être du texte.
  // Géré directement ci-dessous.

  return (
    <article className="post-card">
      {/* ===== COLONNE DE VOTES ===== */}
      <div className="post-votes">
        <button className="vote-btn">▲</button>
        <span className="score">{score}</span>
        <button className="vote-btn">▼</button>
      </div>
      
      {/* ===== CONTENU PRINCIPAL ===== */}
      <div className="post-content">
        {/* En-tête */}
        <div className="post-header">
          <Link to={`/r/${subreddit}`} className="post-subreddit">
            r/{subreddit}
          </Link>
          <span className="separator">•</span>
          <span className="post-author">u/{author}</span>
          <span className="separator">•</span>
          <span className="post-time">{timeAgo(created_utc)}</span>
        </div>

        {/* Titre */}
        <Link to={`/r/${subreddit}/${id}`} className="post-title-link">
          <h3 className="post-title">{title}</h3>
        </Link>

        {/* ===== APERÇU MÉDIA ET LIENS EXTERNES ===== */}
        <div className="postcard-media-wrapper">
          <MediaRenderer post={post} />
        </div>

        {/* Extrait de texte si pas de selftext vide (et si pas de media on peut l'afficher) */}
        {selftext && (
          <div className="post-selftext-preview">
            {selftext.substring(0, 300)}
            {selftext.length > 300 && '...'}
          </div>
        )}

        {/* Pied de page */}
        <div className="post-footer">
          <Link to={`/r/${subreddit}/${id}`} className="post-comments-link">
            💬 {num_comments} commentaire{num_comments > 1 ? 's' : ''}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;