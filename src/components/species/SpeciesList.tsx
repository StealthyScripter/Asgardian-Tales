import React from 'react';
import SpeciesCard from './SpeciesCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Species } from '../../interfaces';

interface SpeciesListProps {
  speciesList: Species[];
  isLoading: boolean;
  error: string | null;
  onSearch: (term: string) => void;
  searchTerm: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const SpeciesList: React.FC<SpeciesListProps> = ({ 
  speciesList, 
  isLoading, 
  error,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage
}) => {
  if (isLoading && speciesList.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="species-list-container">
      {speciesList.length === 0 ? (
        <div className="no-results">
          <p>No species found. Try a different search term.</p>
        </div>
      ) : (
        <>
          <div className="species-grid">
            {speciesList.map((species) => <SpeciesCard key={species.url} species={species} />)}
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

export default SpeciesList;