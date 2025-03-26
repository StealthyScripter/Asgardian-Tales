import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchPlanets } from '../../services/api';
import { Planet } from '../../interfaces';
import SectionTitle from '../../components/common/SectionTitle';
import PlanetList from '../../components/planets/PlanetList';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const PlanetsPage: React.FC = () => {
  const {
    data: planets,
    isLoading,
    error,
    searchTerm,
    handleSearch,
    loadNextPage,
    loadPrevPage,
    hasNextPage,
    hasPrevPage
  } = useStarWarsData<Planet>(fetchPlanets);

  return (
    <div className="page-container">
      <SectionTitle
        title="Planets"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Planets...'
      />
      
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (

      <PlanetList
        planets={planets}
        isLoading={isLoading}
        error={error}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onNextPage={loadNextPage}
        onPrevPage={loadPrevPage}
      />
    )}
    </div>
  );
};

export default PlanetsPage;