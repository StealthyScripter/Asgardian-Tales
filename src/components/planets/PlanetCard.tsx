import React, { useState } from 'react';
import { Planet } from '../../interfaces';

interface PlanetCardProps {
  planet: Planet;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatPopulation = (population: string): string => {
    if (population === "unknown") return "Unknown";
    return parseInt(population).toLocaleString();
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      
      <div className="section">
        <h3>Environment</h3>
        <p>Climate: {planet.climate}</p>
        <p>Terrain: {planet.terrain}</p>
      </div>
      
      <div className="section">
        <h3>Statistics</h3>
        <p>Population: {formatPopulation(planet.population)}</p>
        <p>Diameter: {planet.diameter !== "unknown" ? `${parseInt(planet.diameter).toLocaleString()} km` : "Unknown"}</p>
      </div>
      
      <div className="section">
        <h3>Appears In</h3>
        <div className="appearance-tags">
          {planet.films.length > 0 && (
            <span className="tag">{planet.films.length} Films</span>
          )}
          {planet.residents.length > 0 && (
            <span className="tag">{planet.residents.length} Residents</span>
          )}
        </div>
      </div>
      
      <button onClick={toggleDetails} className="details-button">
        {showDetails ? 'Hide Details' : 'Show More Details'}
      </button>

      {showDetails && (
        <div className="planet-details">
          <div className="section">
            <h3>Orbital Information</h3>
            <p>Rotation Period: {planet.rotation_period !== "unknown" ? `${planet.rotation_period} days` : "Unknown"}</p>
            <p>Orbital Period: {planet.orbital_period !== "unknown" ? `${planet.orbital_period} days` : "Unknown"}</p>
            <p>Gravity: {planet.gravity}</p>
            <p>Surface Water: {planet.surface_water !== "unknown" ? `${planet.surface_water}%` : "Unknown"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanetCard;