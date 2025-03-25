import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchStarships } from '../../services/api';
import { Starship } from '../../interfaces';
import SectionTitle from '../../components/common/SectionTitle';
import StarshipList from '../../components/starships/StarshipList';

const StarshipsPage: React.FC = () => {
  const {
    data: starships,
    isLoading,
    error,
    searchTerm,
    handleSearch,
    loadNextPage,
    loadPrevPage,
    hasNextPage,
    hasPrevPage
  } = useStarWarsData<Starship>(fetchStarships);

  return (
    <div className="page-container">
      <SectionTitle
        title="Starships"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Starships...'
      />
      
      <StarshipList
        starships={starships}
        isLoading={isLoading}
        error={error}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onNextPage={loadNextPage}
        onPrevPage={loadPrevPage}
      />
    </div>
  );
};

export default StarshipsPage;