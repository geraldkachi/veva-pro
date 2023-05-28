import React from "react";
import "./index.scss";

const Loading = ({ full, ...props }) => {
  return (
    <div className="w-100 text-center" id={full ? "loading" : ""} {...props}>
      <div className="loader">
        <div className="loader__ball"></div>
        <div className="loader__ball"></div>
        <div className="loader__ball"></div>
      </div>
    </div>
  );
};
export default Loading;
