import React from 'react';
import './Skeleton.css';

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-votes">
        <div className="skeleton-btn pulse"></div>
        <div className="skeleton-score pulse"></div>
        <div className="skeleton-btn pulse"></div>
      </div>
      
      <div className="skeleton-content">
        <div className="skeleton-header">
          <div className="skeleton-text pulse" style={{ width: '120px' }}></div>
          <div className="skeleton-text pulse" style={{ width: '80px', marginLeft: '8px' }}></div>
        </div>
        
        <div className="skeleton-title pulse" style={{ width: '80%' }}></div>
        <div className="skeleton-title pulse" style={{ width: '60%' }}></div>
        
        <div className="skeleton-media pulse"></div>
        
        <div className="skeleton-footer">
          <div className="skeleton-text pulse" style={{ width: '100px' }}></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonComment = () => {
  return (
    <div className="skeleton-comment">
      <div className="skeleton-comment-header">
        <div className="skeleton-avatar pulse"></div>
        <div className="skeleton-text pulse" style={{ width: '100px', marginLeft: '12px' }}></div>
        <div className="skeleton-text pulse" style={{ width: '60px', marginLeft: '8px' }}></div>
      </div>
      <div className="skeleton-comment-body">
        <div className="skeleton-text pulse" style={{ width: '100%' }}></div>
        <div className="skeleton-text pulse" style={{ width: '80%' }}></div>
      </div>
    </div>
  );
};
