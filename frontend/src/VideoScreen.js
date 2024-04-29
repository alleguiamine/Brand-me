import React from 'react';

const VideoScreen = (videoUrl) => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="Embedded Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {/* <a href={videoUrl}>Lien vers la vidéo</a> */}
    </div>
  );
};

export default VideoScreen;
