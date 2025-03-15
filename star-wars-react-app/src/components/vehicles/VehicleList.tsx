import React from 'react';
import VehicleCard from './VehicleCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Vehicle } from '../../interfaces';

interface VehicleListProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="vehicle-list">
      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        vehicles.map((vehicle) => <VehicleCard key={vehicle.url} vehicle={vehicle} />)
      )}
    </div>
  );
};

export default VehicleList;