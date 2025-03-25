import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchSpecies } from '../../services/api';
import { Species } from '../../interfaces';
import SectionTitle from '../../components/common/SectionTitle';
import SpeciesList from '../../components/species/SpeciesList';

const SpeciesPage: React.FC = () => {
  const {
    data: speciesList,
    isLoading,
    error,
    searchTerm,
    handleSearch,
    loadNextPage,
    loadPrevPage,
    hasNextPage,
    hasPrevPage
  } = useStarWarsData<Species>(fetchSpecies);

  return (
    <div className="page-container">
      <SectionTitle
        title="Species"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Species...'
      />
      
      <SpeciesList
        speciesList={speciesList}
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

export default SpeciesPage;