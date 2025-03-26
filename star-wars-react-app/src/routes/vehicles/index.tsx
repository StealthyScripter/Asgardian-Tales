import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchVehicles } from '../../services/api';
import { Vehicle } from '../../interfaces';
import SectionTitle from '../../components/common/SectionTitle';
import VehicleList from '../../components/vehicles/VehicleList';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const VehiclesPage: React.FC = () => {
  const {
    data: vehicles,
    isLoading,
    error,
    searchTerm,
    handleSearch,
    loadNextPage,
    loadPrevPage,
    hasNextPage,
    hasPrevPage
  } = useStarWarsData<Vehicle>(fetchVehicles);

  return (
    <div className="page-container">
      <SectionTitle
        title="Vehicles"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Vehicles...'
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
      
      <VehicleList
        vehicles={vehicles}
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

export default VehiclesPage;