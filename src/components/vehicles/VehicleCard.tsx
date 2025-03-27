import React, { useState } from 'react';
import { Vehicle } from '../../interfaces';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatCost = (credits: string): string => {
    if (credits === "unknown") return "Unknown";
    return `${parseInt(credits).toLocaleString()} credits`;
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="vehicle-card">
      <h2>{vehicle.name}</h2>
      
      <div className="section">
        <h3>Classification</h3>
        <p>{vehicle.model}</p>
        <p>Class: {vehicle.vehicle_class}</p>
      </div>
      
      <div className="section">
        <h3>Specifications</h3>
        <p>Manufacturer: {vehicle.manufacturer}</p>
        <p>Cost: {formatCost(vehicle.cost_in_credits)}</p>
      </div>
      
      <div className="section">
        <h3>Crew & Capacity</h3>
        <p>Crew: {vehicle.crew}</p>
        <p>Passengers: {vehicle.passengers}</p>
      </div>
      
      <div className="section">
        <h3>Appears In</h3>
        <div className="appearance-tags">
          {vehicle.films.length > 0 && (
            <span className="tag">{vehicle.films.length} Films</span>
          )}
          {vehicle.pilots.length > 0 && (
            <span className="tag">{vehicle.pilots.length} Pilots</span>
          )}
        </div>
      </div>
      
      <button onClick={toggleDetails} className="details-button">
        {showDetails ? 'Hide Details' : 'Show More Details'}
      </button>

      {showDetails && (
        <div className="vehicle-details">
          <div className="section">
            <h3>Technical Specifications</h3>
            <p>Length: {vehicle.length !== "unknown" ? `${vehicle.length} m` : "Unknown"}</p>
            <p>Max Atmosphering Speed: {vehicle.max_atmosphering_speed}</p>
          </div>
          
          <div className="section">
            <h3>Cargo Specifications</h3>
            <p>Cargo Capacity: {vehicle.cargo_capacity !== "unknown" ? `${parseInt(vehicle.cargo_capacity).toLocaleString()} kg` : "Unknown"}</p>
            <p>Consumables: {vehicle.consumables}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;