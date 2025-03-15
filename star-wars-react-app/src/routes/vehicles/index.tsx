import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchVehicles } from '../../services/api';
import { Vehicle } from '../../interfaces';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import SectionTitle from '../../components/common/SectionTitle';



const PlanetsPage: React.FC = () => {
  const {
    data: vehicles,
    isLoading,
    error,
    searchTerm,
    handleSearch
  } = useStarWarsData<Vehicle>(fetchVehicles);

  if (isLoading && vehicles.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  
  return (
    <div className="page-container">
      <SectionTitle
        title="Vehicles"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search vehicles...'
      />
      {/* Planet list component will go here */}
      <p>Sorry!! Vehicle's page will be implemented soon!</p>
    </div>
  );
};

export default PlanetsPage;