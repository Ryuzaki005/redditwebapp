/**
 * Calcule le temps écoulé depuis la création du post
 * @param {number} created_utc - Timestamp de création en secondes
 * @returns {string} - Texte lisible (ex: "il y a 2 h")
 */
export const timeAgo = (created_utc) => {
  if (!created_utc) return '';
  const now = Date.now() / 1000;
  const diff = now - created_utc;
  
  if (diff < 60) return "à l'instant";
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  return `il y a ${Math.floor(diff / 86400)} j`;
};

/**
 * Récupère les sources vidéo disponibles pour un post
 * @param {Object} post - Le post Reddit complet
 * @returns {Array} - Tableau de sources vidéo [{url, type}]
 */
export const getVideoSources = (post) => {
  if (!post) return [];
  const sources = [];
  
  // 1. HLS (MPEG-URL)
  if (post.media?.reddit_video?.hls_url) {
    sources.push({
      url: post.media.reddit_video.hls_url,
      type: 'application/x-mpegURL'
    });
  }
  
  // 2. DASH fallback classique
  if (post.media?.reddit_video?.fallback_url) {
    sources.push({
      url: post.media.reddit_video.fallback_url,
      type: 'video/mp4'
    });
  }
  
  // 3. Media Sécurisé
  if (post.secure_media?.reddit_video?.fallback_url) {
    sources.push({
      url: post.secure_media.reddit_video.fallback_url,
      type: 'video/mp4'
    });
  }
  
  // 4. Construction manuelle des différentes qualités depuis l'URL de base si v.redd.it
  if (post.url?.includes('v.redd.it')) {
    const baseUrl = post.url;
    ['1080', '720', '480', '360', '240'].forEach(quality => {
      sources.push({
        url: `${baseUrl}/DASH_${quality}.mp4`,
        type: 'video/mp4'
      });
    });
    
    // Piste audio séparée (optionnelle pour Custom Playback, parfois intégrée)
    sources.push({
      url: `${baseUrl}/DASH_audio.mp4`,
      type: 'video/mp4'
    });
  }
  
  return sources;
};

/**
 * Extrait l'URL de l'image (si c'est une image compatible ou un thumbnail valide)
 * @param {Object} post - Le post Reddit complet
 * @returns {string|null} - URL de l'image ou null
 */
export const getImageUrl = (post) => {
  if (!post) return null;
  const imageExtensions = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i;
  
  if (post.url?.match(imageExtensions)) {
    return post.url;
  }
  
  if (post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && post.thumbnail !== 'nsfw' && post.thumbnail !== 'spoiler') {
    return post.thumbnail;
  }
  
  return null;
};
