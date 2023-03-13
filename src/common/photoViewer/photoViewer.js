import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function PhotoViewer({ url }) {
  return (
    <PhotoProvider>
      <PhotoView src={BASE_URL + "/" + url}>
        <img
          src={BASE_URL + "/" + url}
          style={{ objectFit: "cover" }}
          height="35px"
          width="35px"
        />
      </PhotoView>
    </PhotoProvider>
  );
}
