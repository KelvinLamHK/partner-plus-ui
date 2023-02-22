import React from "react";
import '../css/LoadingSpinnerCss.css'

const LoadingSpinner = () => {
  return (
    <div className="loading-screen">
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default LoadingSpinner;