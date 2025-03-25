import React from 'react';
import StarshipCard from './StarshipCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Starship } from '../../interfaces';

interface StarshipListProps {
  starships: Starship[];
  isLoading: boolean;
  error: string | null;
  onSearch: (term: string) => void;
  searchTerm: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const StarshipList: React.FC<StarshipListProps> = ({ 
  starships, 
  isLoading, 
  error,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage
}) => {
  if (isLoading && starships.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="starship-list-container">
      {starships.length === 0 ? (
        <div className="no-results">
          <p>No starships found. Try a different search term.</p>
        </div>
      ) : (
        <>
          <div className="starship-grid">
            {starships.map((starship) => <StarshipCard key={starship.url} starship={starship} />)}
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

export default StarshipList;