import React from 'react';
import FilmCard from './FilmCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Film } from '../../interfaces';

interface FilmListProps {
  films: Film[];
  isLoading: boolean;
  error: string | null;
  onSearch: (term: string) => void;
  searchTerm: string;
}

const FilmList: React.FC<FilmListProps> = ({ 
  films, 
  isLoading, 
  error 
}) => {
  if (isLoading && films.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return (
    <div className="film-list-container">
      {films.length === 0 ? (
        <div className="no-results">
          <p>No films found. Try a different search term.</p>
        </div>
      ) : (
        <div className="film-grid">
          {films.map((film) => <FilmCard key={film.url} film={film} />)}
        </div>
      )}
    </div>
  );
};

export default FilmList;