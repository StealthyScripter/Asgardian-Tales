import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchSpecies } from '../../services/api';
import { Species } from '../../interfaces';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import SectionTitle from '../../components/common/SectionTitle';



const SpeciesPage: React.FC = () => {
  const {
    data: species,
    isLoading,
    error,
    searchTerm,
    handleSearch
  } = useStarWarsData<Species>(fetchSpecies);

  if (isLoading && species.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  
  return (
    <div className="page-container">
      <SectionTitle
        title="Species"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Species...'
      />
      {/* Planet list component will go here */}
      <p>Sorry!! Species's page will be implemented soon!</p>
    </div>
  );
};

export default SpeciesPage;