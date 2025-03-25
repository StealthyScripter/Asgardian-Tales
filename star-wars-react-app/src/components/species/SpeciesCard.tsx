import React, { useState } from 'react';
import { Species } from '../../interfaces';

interface SpeciesCardProps {
  species: Species;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="species-card">
      <h2>{species.name}</h2>
      
      <div className="section">
        <h3>Classification</h3>
        <p>{species.classification} ({species.designation})</p>
      </div>
      
      <div className="section">
        <h3>Physical Attributes</h3>
        <p>Average Height: {species.average_height !== "unknown" ? `${species.average_height} cm` : "Unknown"}</p>
        <p>Lifespan: {species.average_lifespan !== "unknown" ? `${species.average_lifespan} years` : "Unknown"}</p>
      </div>
      
      <div className="section">
        <h3>Language</h3>
        <p>{species.language}</p>
      </div>
      
      <div className="section">
        <h3>Appears In</h3>
        <div className="appearance-tags">
          {species.films.length > 0 && (
            <span className="tag">{species.films.length} Films</span>
          )}
          {species.people.length > 0 && (
            <span className="tag">{species.people.length} Characters</span>
          )}
        </div>
      </div>
      
      <button onClick={toggleDetails} className="details-button">
        {showDetails ? 'Hide Details' : 'Show More Details'}
      </button>

      {showDetails && (
        <div className="species-details">
          <div className="section">
            <h3>Appearance</h3>
            <p>Hair Colors: {species.hair_colors}</p>
            <p>Skin Colors: {species.skin_colors}</p>
            <p>Eye Colors: {species.eye_colors}</p>
          </div>
          
          {species.homeworld && (
            <div className="section">
              <h3>Homeworld</h3>
              <p>{species.homeworld}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpeciesCard;