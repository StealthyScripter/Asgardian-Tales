import React from 'react';
import VehicleCard from './VehicleCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Vehicle } from '../../interfaces';

interface VehicleListProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
  onSearch: (term: string) => void;
  searchTerm: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const VehicleList: React.FC<VehicleListProps> = ({ 
  vehicles, 
  isLoading, 
  error,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage
}) => {
  if (isLoading && vehicles.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="vehicle-list-container">
      {vehicles.length === 0 ? (
        <div className="no-results">
          <p>No vehicles found. Try a different search term.</p>
        </div>
      ) : (
        <>
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => <VehicleCard key={vehicle.url} vehicle={vehicle} />)}
          </div>
          
          <div className="pagination">
            <button 
              onClick={onPrevPage} 
              disabled={!hasPrevPage || isLoading}
              className="pagination-button"
            >
              Previous
            </button>
            <button 
              onClick={onNextPage} 
              disabled={!hasNextPage || isLoading}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleList;