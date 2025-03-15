import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchPlanets } from '../../services/api';
import { Planet } from '../../interfaces';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import SectionTitle from '../../components/common/SectionTitle';



const PlanetsPage: React.FC = () => {
  const {
    data: planets,
    isLoading,
    error,
    searchTerm,
    handleSearch
  } = useStarWarsData<Planet>(fetchPlanets);

  if (isLoading && planets.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  
  return (
    <div className="page-container">
      <SectionTitle
        title="Planets"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Planets...'
      />
      {/* Planet list component will go here */}
      <p>Sorry!! Species's page will be implemented soon!</p>
    </div>
  );
};

export default PlanetsPage;