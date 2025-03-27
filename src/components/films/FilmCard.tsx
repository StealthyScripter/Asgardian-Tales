import React, { useState } from 'react';
import { Film } from '../../interfaces';

interface FilmCardProps {
  film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="film-card">
      <h2>{film.title}</h2>
      
      <div className="section">
        <h3>Episode {film.episode_id}</h3>
        <p>Director: {film.director}</p>
        <p>Release Date: {formatDate(film.release_date)}</p>
      </div>
      
      <div className="section">
        <h3>Opening Crawl</h3>
        <p className="opening-crawl">{film.opening_crawl.substring(0, 150)}...</p>
      </div>
      
      <div className="section">
        <h3>Features</h3>
        <div className="appearance-tags">
          {film.characters.length > 0 && (
            <span className="tag">{film.characters.length} Characters</span>
          )}
          {film.planets.length > 0 && (
            <span className="tag">{film.planets.length} Planets</span>
          )}
          {film.starships.length > 0 && (
            <span className="tag">{film.starships.length} Starships</span>
          )}
          {film.vehicles.length > 0 && (
            <span className="tag">{film.vehicles.length} Vehicles</span>
          )}
          {film.species.length > 0 && (
            <span className="tag">{film.species.length} Species</span>
          )}
        </div>
      </div>
      
      <button onClick={toggleDetails} className="details-button">
        {showDetails ? 'Hide Details' : 'Show More Details'}
      </button>

      {showDetails && (
        <div className="film-details">
          <div className="section">
            <h3>Full Opening Crawl</h3>
            <p className="full-opening-crawl">{film.opening_crawl}</p>
          </div>
          
          <div className="section">
            <h3>Production</h3>
            <p>Producer: {film.producer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmCard;