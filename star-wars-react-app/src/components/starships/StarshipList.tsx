import React from 'react';
import StarshipCard from './StarshipCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Starship } from '../../interfaces';

interface StarshipListProps {
  starships: Starship[];
  isLoading: boolean;
  error: string | null;
}

const StarshipList: React.FC<StarshipListProps> = ({ starships, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="starship-list">
      {starships.length === 0 ? (
        <p>No starships found.</p>
      ) : (
        starships.map((starship) => <StarshipCard key={starship.url} starship={starship} />)
      )}
    </div>
  );
};

export default StarshipList;