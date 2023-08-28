import React from "react";
import "./YoutubeTrailer.scss";

const YoutubeTrailer = ({ src }) => {
  return (
    <div>
      <iframe
        className="iframe"
        src={src}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Youtube video player"
        sandbox
        loading="eager"
      />
    </div>
  );
};

export default YoutubeTrailer;
