import React from 'react';
import Comment from '../Comment/Comment';
import { SkeletonComment } from '../Skeleton/Skeleton';
import './CommentSection.css'; // S'il y a des styles spécifiques à séparer

const CommentSection = ({ comments, status, error, numComments }) => {
  return (
    <section className="comments-section">
      <h2 className="comments-title">Commentaires ({numComments || 0})</h2>
      
      {status === 'loading' && (
        <div className="comments-loading-skeletons">
          {[...Array(3)].map((_, index) => (
            <SkeletonComment key={index} />
          ))}
        </div>
      )}
      
      {status === 'failed' && (
        <div className="comments-error">Erreur : {error}</div>
      )}
      
      {status === 'succeeded' && (!comments || comments.length === 0) && (
        <div className="no-comments">Aucun commentaire pour ce post.</div>
      )}
      
      {status === 'succeeded' && comments && comments.length > 0 && (
        <div className="comments-list">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentSection;
