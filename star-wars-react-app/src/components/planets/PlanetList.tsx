import React from 'react';
import PlanetCard from './PlanetCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Planet } from '../../interfaces';

interface PlanetListProps {
  planets: Planet[];
  isLoading: boolean;
  error: string | null;
  onSearch: (term: string) => void;
  searchTerm: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;

}

const PlanetList: React.FC<PlanetListProps> = ({ 
  planets,
  isLoading, 
  error, 
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage
 }) => {
  if (isLoading && planets.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="planet-list-container">
      {planets.length === 0 ? (
        <div className="no-results">
          <p>No planets found. Try a different search term.</p>
        </div>
      ) : (
        <>
          <div className="planet-grid">
            {planets.map((planet) => <PlanetCard key={planet.url} planet={planet} />)}
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

export default PlanetList;