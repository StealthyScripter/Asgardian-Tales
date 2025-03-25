import React, { useState } from 'react';
import { Starship } from '../../interfaces';

interface StarshipCardProps {
  starship: Starship;
}

const StarshipCard: React.FC<StarshipCardProps> = ({ starship }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatCost = (credits: string): string => {
    if (credits === "unknown") return "Unknown";
    return `${parseInt(credits).toLocaleString()} credits`;
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="starship-card">
      <h2>{starship.name}</h2>
      
      <div className="section">
        <h3>Classification</h3>
        <p>{starship.model}</p>
        <p>Class: {starship.starship_class}</p>
      </div>
      
      <div className="section">
        <h3>Specifications</h3>
        <p>Manufacturer: {starship.manufacturer}</p>
        <p>Cost: {formatCost(starship.cost_in_credits)}</p>
      </div>
      
      <div className="section">
        <h3>Crew & Capacity</h3>
        <p>Crew: {starship.crew}</p>
        <p>Passengers: {starship.passengers}</p>
      </div>
      
      <div className="section">
        <h3>Appears In</h3>
        <div className="appearance-tags">
          {starship.films.length > 0 && (
            <span className="tag">{starship.films.length} Films</span>
          )}
          {starship.pilots.length > 0 && (
            <span className="tag">{starship.pilots.length} Pilots</span>
          )}
        </div>
      </div>
      
      <button onClick={toggleDetails} className="details-button">
        {showDetails ? 'Hide Details' : 'Show More Details'}
      </button>

      {showDetails && (
        <div className="starship-details">
          <div className="section">
            <h3>Technical Specifications</h3>
            <p>Length: {starship.length !== "unknown" ? `${starship.length} m` : "Unknown"}</p>
            <p>Max Atmosphering Speed: {starship.max_atmosphering_speed}</p>
            <p>Hyperdrive Rating: {starship.hyperdrive_rating}</p>
            <p>MGLT: {starship.MGLT}</p>
          </div>
          
          <div className="section">
            <h3>Cargo Specifications</h3>
            <p>Cargo Capacity: {starship.cargo_capacity !== "unknown" ? `${parseInt(starship.cargo_capacity).toLocaleString()} kg` : "Unknown"}</p>
            <p>Consumables: {starship.consumables}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StarshipCard;