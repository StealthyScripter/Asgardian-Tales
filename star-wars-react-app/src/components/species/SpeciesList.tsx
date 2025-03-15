import React from 'react';
import SpeciesCard from './SpeciesCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Species } from '../../interfaces';

interface SpeciesListProps {
  speciesList: Species[];
  isLoading: boolean;
  error: string | null;
}

const SpeciesList: React.FC<SpeciesListProps> = ({ speciesList, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="species-list">
      {speciesList.length === 0 ? (
        <p>No species found.</p>
      ) : (
        speciesList.map((species) => <SpeciesCard key={species.url} species={species} />)
      )}
    </div>
  );
};

export default SpeciesList;