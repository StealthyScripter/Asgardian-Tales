import React from 'react';
import SearchBar from './SearchBar';

interface SectionTitleProps  {
    title:string;
    onSearch: (term: string) => void;
    searchTerm: string;
    placeholder:string;

}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, onSearch, searchTerm, placeholder }) => {
  return (
    <div className="page-title-container">
      <h2 className="page-title">{title}</h2>
      <SearchBar 
        onSearch={onSearch} 
        placeholder={placeholder || "Search..."} 
        initialValue={searchTerm}
      />
    </div>
  );
};

export default SectionTitle;
