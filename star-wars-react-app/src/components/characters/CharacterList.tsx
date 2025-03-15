import React from 'react';
import { Character } from '../../interfaces';
import CharacterCard from './CharacterCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface CharacterListProps {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  onSearch: (term: string) => void;
  searchTerm: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  isLoading,
  error,
  onSearch,
  searchTerm,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
}) => {
  if (isLoading && characters.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="character-list-container">
      {characters.length === 0 ? (
        <div className="no-results">
          <p>No characters found. Try a different search term.</p>
        </div>
      ) : (
        <>
          <div className="character-grid">
            {characters.map(character => (
              <CharacterCard 
                key={character.url} 
                character={character} 
              />
            ))}
          </div>
          
          <div className="pagination">
            <button 
              onClick={onPrevPage} 
              disabled={!hasPrevPage || isLoading}
              className="pagination-button"
            >
              Previous
            </button>
            <button 
              onClick={onNextPage} 
              disabled={!hasNextPage || isLoading}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterList;