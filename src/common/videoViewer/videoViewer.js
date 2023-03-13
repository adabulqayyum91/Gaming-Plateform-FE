import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ReactPlayer from "react-player";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/";

export default function videoViewer({ videoUrl }) {
  const elementSize = 500;
  return (
    <PhotoProvider>
      <PhotoView
        width={elementSize}
        height={elementSize}
        render={({ scale, attrs }) => {
          const width = attrs.style.width;
          const offset = (width - elementSize) / elementSize;
          const childScale = scale === 1 ? scale + offset : 1 + offset;

          return (
            <div {...attrs}>
              <div
                style={{
                  transform: `scale(${childScale})`,
                }}
              >
                <ReactPlayer controls playing url={BASE_URL + videoUrl} />
              </div>
            </div>
          );
        }}
      >
        <video width="35px" height="35px">
          <source src={BASE_URL + videoUrl} type="video/mp4" />
          <source src={BASE_URL + videoUrl} type="video/webm" />
        </video>
      </PhotoView>
    </PhotoProvider>
  );
}
