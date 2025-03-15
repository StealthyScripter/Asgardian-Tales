import React from 'react';
import { Planet } from '../../interfaces';

interface PlanetCardProps {
  planet: Planet;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  return (
    <div className="planet-card">
      <h3>{planet.name}</h3>
      <div className="planet-details">
        <p><strong>Climate:</strong> {planet.climate}</p>
        <p><strong>Terrain:</strong> {planet.terrain}</p>
        <p><strong>Population:</strong> {planet.population !== "unknown" ? parseInt(planet.population).toLocaleString() : "Unknown"}</p>
        <p><strong>Diameter:</strong> {planet.diameter !== "unknown" ? `${parseInt(planet.diameter).toLocaleString()} km` : "Unknown"}</p>
      </div>
    </div>
  );
};

export default PlanetCard;