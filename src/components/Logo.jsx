import React from 'react';
import LinkButton from './LinkButton';

const Logo = ({ to = "/", className = '' }) => {
  return (
    <LinkButton to={to} className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="AI App Logo" 
        className="h-10 mr-2"
      />
      <h1 className="text-xl font-bold">AI Assistant</h1>
    </LinkButton>
  );
};

export default Logo;