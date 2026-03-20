import React from "react";
import "./Comment.css";

const Comment = ({ comment }) => {
  const { author, body, score, created_utc } = comment;

  // ===== FONCTIONS UTILITAIRES =====
  const timeAgo = () => {
    const now = Date.now() / 1000;
    const diff = now - created_utc;
    
    if (diff < 60) return 'à l\'instant';
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
    return `il y a ${Math.floor(diff / 86400)} j`;
  };

    // const hasReplies = comment.replies && comment.replies.data && comment.replies.data.children.length > 0;
    // const replyComments = hasReplies
    //     ? comment.replies.data.children.filter(child => child.kind !== 'more').map(child => child.data)
    //     : [];

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{author}</span>
        <span className="comment-time">{timeAgo()}</span>
        <span className="comment-score">{score} points</span>
      </div>
      <div className="comment-body">{body}</div>
    </div>
  );
};

export default Comment;