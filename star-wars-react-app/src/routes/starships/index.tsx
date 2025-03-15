import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchStarships } from '../../services/api';
import { Starship } from '../../interfaces';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import SectionTitle from '../../components/common/SectionTitle';



const StarshipPage: React.FC = () => {
  const {
    data: starships,
    isLoading,
    error,
    searchTerm,
    handleSearch
  } = useStarWarsData<Starship>(fetchStarships);

  if (isLoading && starships.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  
  return (
    <div className="page-container">
      <SectionTitle
        title="Starship"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Starships...'
      />
      {/* Planet list component will go here */}
      <p>Sorry!! Starship's page will be implemented soon!</p>
    </div>
  );
};

export default StarshipPage;