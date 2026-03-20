import React, { useEffect, useRef, useCallback } from 'react';
import PostCard from '../PostCard/PostCard';
import './Feed.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsAsync, loadMorePostsAsync } from '../../store/postsSlice';
import { SkeletonCard } from '../Skeleton/Skeleton';

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, status, error, loadingMore, afterToken, selectedSubreddit, searchTerm } = useSelector((store) => store.posts);
  const observer = useRef();

  const lastPostElementRef = useCallback(node => {
    if (status === 'loading' || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && afterToken) {
        dispatch(loadMorePostsAsync({ subreddit: selectedSubreddit, searchTerm, after: afterToken }));
      }
    });
    
    if (node) observer.current.observe(node);
  }, [status, loadingMore, afterToken, dispatch, selectedSubreddit, searchTerm]);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="feed">
        {[...Array(5)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }
  
  if (status === 'failed') {
    return <div className="feed-error">Erreur: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="feed-empty">Aucun post à afficher</div>;
  }

  return (
    <div className="feed">
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          // Attache la ref sur le dernier élément pour le scroll infini
          return (
            <div ref={lastPostElementRef} key={post.id}>
              <PostCard post={post} />
            </div>
          );
        } else {
          return <PostCard key={post.id} post={post} />;
        }
      })}
      
      {/* Squelette affiché pendant le chargement supplémentaire */}
      {loadingMore && (
        <div style={{ marginTop: '16px' }}>
          <SkeletonCard />
        </div>
      )}
    </div>
  );
};

export default Feed;