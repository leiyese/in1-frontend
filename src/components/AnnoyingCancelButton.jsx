import React, { useState } from "react";

const AnnoyingCancelButton = ({ avoidCursor = true, onClick, children, style, ...props }) => {
  const [offset, setOffset] = useState({ top: 0, left: 0 });

  const handleMouseEnter = () => {
    if (!avoidCursor) return;
    // Generate a new random offset (adjust values as desired)
    const newOffset = {
      top: Math.floor(Math.random() * 100) - 50, // between -50 and 50px
      left: Math.floor(Math.random() * 100) - 50,
    };
    setOffset(newOffset);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{
        transform: `translate(${offset.left}px, ${offset.top}px)`,
        transition: "transform 0.2s ease-out",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnnoyingCancelButton;