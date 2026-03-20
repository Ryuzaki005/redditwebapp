import React, { useRef, useEffect } from 'react';
import { getVideoSources } from '../../utils/helpers';
import Carousel from '../Carousel/Carousel';
import './MediaRenderer.css';

const MediaRenderer = ({ post }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {}); // Autoplay silencieux (certains navigateurs bloquent sans interaction)
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.5 } // 50% visible pour déclencher
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  if (!post) return null;

  // === CAS 1 : VIDÉO ===
  if (post.is_video || post.post_hint === 'hosted:video' || post.url?.includes('v.redd.it')) {
    const videoSources = getVideoSources(post);
    
    if (videoSources.length > 0) {
      return (
        <div className="post-media">
          <video 
            ref={videoRef}
            controls
            muted
            onPlay={(e) => { e.target.muted = false; }}
            className="post-video"
            poster={post.thumbnail || post.thumbnail_url}
            preload="metadata"
            crossOrigin="anonymous"
            playsInline
          >
            {videoSources.map((source, index) => (
              <source 
                key={index} 
                src={source.url} 
                type={source.type} 
              />
            ))}
          </video>
        </div>
      );
    }
  }

  // === CAS 2 : IMAGE ===
  const imageExtensions = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i;
  if (post.url?.match(imageExtensions)) {
    return (
      <div className="post-media">
        <img 
          src={post.url} 
          alt={post.title || 'Post image'}
          className="post-image"
          loading="lazy"
        />
      </div>
    );
  }

  // === CAS 3 : GALERIE D'IMAGES ===
  if (post.is_gallery || post.gallery_data) {
    if (post.gallery_data && post.media_metadata) {
      const images = post.gallery_data.items
        .map(item => {
          const mediaId = item.media_id;
          const metadata = post.media_metadata[mediaId];
          if (metadata?.s?.u) {
            const imgUrl = metadata.s.u.replace(/&amp;/g, '&');
            return { id: mediaId, url: imgUrl };
          }
          return null;
        })
        .filter(Boolean);

      if (images.length > 0) {
        return (
          <div className="post-media-container">
            <Carousel images={images} />
          </div>
        );
      }
    }
    
    // Fallback si données incomplètes
    return (
      <div className="post-media">
        <div className="post-gallery-placeholder">
          📸 Galerie d'images (non disponible)
        </div>
      </div>
    );
  }

  // === CAS 4 : LIEN EXTERNE ===
  if (post.url && !post.url.includes('reddit.com')) {
    // Extraire l'image preview fournie par l'API
    const previewUrl = post.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&') 
                       || (post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : null);

    return (
      <div className="post-media external-link-preview">
        <a 
          href={post.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="external-link-card"
        >
          {previewUrl && (
            <img src={previewUrl} alt="Lien externe" className="external-link-image" loading="lazy" />
          )}
          <div className="external-link-info">
            <span className="external-link-icon">🔗</span>
            <span className="external-link-url">
              {post.url.replace(/^https?:\/\//, '').substring(0, 60)}
              {post.url.length > 60 ? '...' : ''}
            </span>
          </div>
        </a>
      </div>
    );
  }

  // === AUCUN MEDIA ===
  return null;
};

export default MediaRenderer;
