import React from 'react';
import FilmCard from './FilmCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Film } from '../../interfaces';

interface FilmListProps {
  films: Film[];
  isLoading: boolean;
  error: string | null;
}

const FilmList: React.FC<FilmListProps> = ({ films, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="film-list">
      
      {films.length === 0 ? (
        <p>No films found.</p>
      ) : (
        films.map((film) => <FilmCard key={film.url} film={film} />)
      )}
    </div>
  );
};

export default FilmList;