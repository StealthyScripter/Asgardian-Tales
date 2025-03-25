import React from 'react';

interface CreditProps {
  text: string;
  linkText: string;
  linkUrl?: string;
  author: string;
  authorUrl: string;
}

const Credit: React.FC<CreditProps> = ({ text, linkText, linkUrl, author, authorUrl }) => {
  return (
    <div className="image-credit">
      {text} 
      <a href={authorUrl} target="_blank" rel="noopener noreferrer">{author}</a> on 
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">{linkText}</a>
    </div>
  );
};

export default Credit;
