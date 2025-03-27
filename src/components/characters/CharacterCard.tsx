import React, { useState, useEffect } from 'react';
import { Character, Species } from '../../interfaces';
import { getIdFromUrl, fetchSpeciesById } from '../../services/api';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [speciesDetails, setSpeciesDetails] = useState<Species[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchSpeciesDetails = async () => {
      if (character.species.length > 0) {
        const speciesPromises = character.species.map(speciesUrl => {
          const speciesId = getIdFromUrl(speciesUrl);
          return fetchSpeciesById(speciesId);
        });
        const speciesData = await Promise.all(speciesPromises);
        setSpeciesDetails(speciesData);
      }
    };
    fetchSpeciesDetails();
  }, [character]);

  const formatHeight = (height: string): string => {
    if (height === 'unknown') return 'unknown';
    const cm = parseInt(height);
    return `${cm}cm`;
  };

  const formatMass = (mass: string): string => {
    if (mass === 'unknown') return 'unknown';
    const kg = parseInt(mass);
    return `${kg}kg`;
  };

  const getAttributesText = (): string => {
    const gender = character.gender !== 'n/a' && character.gender !== 'none' ? character.gender : '';
    const height = formatHeight(character.height);
    const mass = formatMass(character.mass);
    
    let attributesText = '';
    if (gender) attributesText += gender;
    if (height !== 'unknown') {
      if (attributesText) attributesText += ', ';
      attributesText += height;
    }
    if (mass !== 'unknown') {
      if (attributesText) attributesText += ', ';
      attributesText += mass;
    }
    
    return attributesText;
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const filmsCount = character.films.length;
  const vehiclesCount = character.vehicles.length;
  const starshipsCount = character.starships.length;
  const speciesCount = character.species.length;

  // Determine if this character is human or another species
  const isHuman = character.species.length === 0; // In Star Wars API, humans often have empty species array

  return (
    <div className="character-card">
      <h2>{character.name}</h2>
      
      <div className="section">
        <h3>Physical Attributes</h3>
        <p>{getAttributesText()}</p>
      </div>
      
      <div className="section">
        <h3>Appearance</h3>
        {character.hair_color !== 'n/a' && character.hair_color !== 'none' && (
          <p>Hair: {character.hair_color}</p>
        )}
        <p>Skin: {character.skin_color}</p>
        <p>Eyes: {character.eye_color}</p>
      </div>
      
      <div className="section">
        <h3>Birth Year</h3>
        <p>{character.birth_year}</p>
      </div>
      
      <div className="section">
        <h3>Appears In</h3>
        <div className="appearance-tags">
          {filmsCount > 0 && <span className="tag">{filmsCount} Films</span>}
          {vehiclesCount > 0 && <span className="tag">{vehiclesCount} Vehicles</span>}
          {starshipsCount > 0 && <span className="tag">{starshipsCount} Starships</span>}
          {speciesCount > 0 && <span className="tag">{speciesCount} Species</span>}
          {isHuman && <span className="tag">Human</span>}
        </div>
      </div>
      
      <button onClick={toggleDetails} className="details-button">
        {showDetails ? 'Hide Details' : 'Show More Details'}
      </button>

      {showDetails && (
  <div className="character-details">
    <div className="section">
      <h3>Homeworld</h3>
      <p>{character.homeworld}</p>
    </div>
    
        {speciesDetails.length > 0 && (
          <div className="section">
            <h3>Species Information</h3>
            {speciesDetails.map((species, index) => (
              <div key={index} className="species-details">
                <p><strong>Name:</strong> {species.name}</p>
                <p><strong>Classification:</strong> {species.classification}</p>
                <p><strong>Language:</strong> {species.language}</p>
                <p><strong>Average Lifespan:</strong> {species.average_lifespan}</p>
                {species.average_height !== 'unknown' && (
                  <p><strong>Average Height:</strong> {species.average_height}cm</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* More sections as needed */}
      </div>
        )}
    </div>
  );
};

export default CharacterCard;