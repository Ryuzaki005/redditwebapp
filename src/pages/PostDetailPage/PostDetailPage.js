import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./PostDetailPage.css";
import { fetchCommentsAsync } from "../../store/commentsSlice";
import { timeAgo } from "../../utils/helpers";
import MediaRenderer from "../../components/MediaRenderer/MediaRenderer";
import CommentSection from "../../components/CommentSection/CommentSection";

const PostDetailPage = () => {
    const dispatch = useDispatch();
    const { subreddit, postId } = useParams();
    const post = useSelector((store) => 
        store.posts.posts.find((p) => p.id === postId)
    );

    const commentsFromStore = useSelector((store) => store.comments.comments);
    const commentsStatus = useSelector((store) => store.comments.status);
    const commentsError = useSelector((store) => store.comments.error);

    useEffect(() => {
        if (post) {
            dispatch(fetchCommentsAsync({ subreddit, postId }));
        }
    }, [dispatch, subreddit, postId, post]);

  if (!post) {
    return (
      <div className="post-detail-page">
        <div className="post-not-found">Post non trouvé</div>
      </div>
    );
  }

  // Le composant MediaRenderer est désormais utilisé pour l'affichage média

  return (
    <div className="post-detail-page">
      <article className="post-detail">
        {/* ===== EN-TÊTE ===== */}
        <div className="post-header">
          <a href={`/r/${post.subreddit}`} className="post-subreddit">
            r/{post.subreddit}
          </a>
          <span className="separator">•</span>
          <span className="post-author">u/{post.author}</span>
          <span className="separator">•</span>
          <span className="post-time">{timeAgo(post.created_utc)}</span>
        </div>

        {/* ===== TITRE ===== */}
        <h1 className="post-title">{post.title}</h1>

        {/* ===== CONTENU TEXTE ===== */}
        {post.selftext && (
          <div className="post-selftext">
            {post.selftext.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* ===== MÉDIA ===== */}
        <MediaRenderer post={post} />

        {/* ===== STATISTIQUES ===== */}
        <div className="post-footer">
          <span className="post-score">
            <span className="vote-arrow">▲</span> {post.score}
          </span>
          <span className="post-comments">
            💬 {post.num_comments} commentaire{post.num_comments > 1 ? 's' : ''}
          </span>
          <span className="post-share">
            ↗️ Partager
          </span>
        </div>
      </article>

      {/* ===== SECTION COMMENTAIRES ===== */}
      <CommentSection 
        comments={commentsFromStore}
        status={commentsStatus}
        error={commentsError}
        numComments={post.num_comments}
      />
    </div>
  );
};

export default PostDetailPage;      
