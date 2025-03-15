import React from 'react';
import { Starship } from '../../interfaces';

interface StarshipCardProps {
  starship: Starship;
}

const StarshipCard: React.FC<StarshipCardProps> = ({ starship }) => {
  return (
    <div className="starship-card">
      <h3>{starship.name}</h3>
      <div className="starship-details">
        <p><strong>Model:</strong> {starship.model}</p>
        <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
        <p><strong>Class:</strong> {starship.starship_class}</p>
        <p><strong>Cost:</strong> {starship.cost_in_credits !== "unknown" ? `${parseInt(starship.cost_in_credits).toLocaleString()} credits` : "Unknown"}</p>
        <p><strong>Speed:</strong> {starship.max_atmosphering_speed}</p>
        <p><strong>Crew:</strong> {starship.crew}</p>
        <p><strong>Passengers:</strong> {starship.passengers}</p>
      </div>
    </div>
  );
};

export default StarshipCard;