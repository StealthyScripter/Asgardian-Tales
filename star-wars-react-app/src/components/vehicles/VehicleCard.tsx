import React from 'react';
import { Vehicle } from '../../interfaces';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="vehicle-card">
      <h3>{vehicle.name}</h3>
      <div className="vehicle-details">
        <p><strong>Model:</strong> {vehicle.model}</p>
        <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
        <p><strong>Class:</strong> {vehicle.vehicle_class}</p>
        <p><strong>Cost:</strong> {vehicle.cost_in_credits !== "unknown" ? `${parseInt(vehicle.cost_in_credits).toLocaleString()} credits` : "Unknown"}</p>
        <p><strong>Speed:</strong> {vehicle.max_atmosphering_speed}</p>
        <p><strong>Crew:</strong> {vehicle.crew}</p>
        <p><strong>Passengers:</strong> {vehicle.passengers}</p>
      </div>
    </div>
  );
};

export default VehicleCard;
