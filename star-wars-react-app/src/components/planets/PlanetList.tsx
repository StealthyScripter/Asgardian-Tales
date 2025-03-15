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

}

const PlanetList: React.FC<PlanetListProps> = ({ planets, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="planet-list">
      {planets.length === 0 ? (
        <p>No planets found.</p>
      ) : (
        planets.map((planet) => <PlanetCard key={planet.url} planet={planet} />)
      )}
    </div>
  );
};

export default PlanetList;