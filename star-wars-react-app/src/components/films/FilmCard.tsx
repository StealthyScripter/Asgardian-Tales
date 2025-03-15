import React from 'react';
import { Film } from '../../interfaces';

interface FilmCardProps {
  film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  return (
    <div className="film-card">
      <h3>{film.title}</h3>
      <div className="film-details">
        <p><strong>Episode:</strong> {film.episode_id}</p>
        <p><strong>Director:</strong> {film.director}</p>
        <p><strong>Release Date:</strong> {new Date(film.release_date).toLocaleDateString()}</p>
        <p className="opening-crawl"><em>{film.opening_crawl.substring(0, 150)}...</em></p>
      </div>
    </div>
  );
};

export default FilmCard;