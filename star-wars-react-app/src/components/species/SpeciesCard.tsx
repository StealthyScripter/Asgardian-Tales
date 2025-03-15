import React from 'react';
import { Species } from '../../interfaces';

interface SpeciesCardProps {
  species: Species;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
  return (
    <div className="species-card">
      <h3>{species.name}</h3>
      <div className="species-details">
        <p><strong>Classification:</strong> {species.classification}</p>
        <p><strong>Designation:</strong> {species.designation}</p>
        <p><strong>Average Height:</strong> {species.average_height !== "unknown" ? `${species.average_height} cm` : "Unknown"}</p>
        <p><strong>Average Lifespan:</strong> {species.average_lifespan !== "unknown" ? `${species.average_lifespan} years` : "Unknown"}</p>
        <p><strong>Language:</strong> {species.language}</p>
      </div>
    </div>
  );
};

export default SpeciesCard;