import React, { useState, useEffect } from "react";
import placeholder from "../../assets/profile-placeholder.svg";

const Avatar = ({ user, className }) => {
  const getInitialSource = () => user?.photoURL || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "User")}&background=random`;

  const [imgSrc, setImgSrc] = useState(getInitialSource());

  useEffect(() => {
    setImgSrc(getInitialSource());
  }, [user?.photoURL, user?.displayName]);

  const handleError = () => {
    if (imgSrc !== placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <img
      src={imgSrc}
      className={className}
      alt="profile"
      onError={handleError}
      referrerPolicy="no-referrer"
    />
  );
};

export default Avatar;
