import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchFilms } from '../../services/api';
import { Film } from '../../interfaces';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import SectionTitle from '../../components/common/SectionTitle';

const FilmsPage: React.FC = () => {
  const {
    data: films,
    isLoading,
    error,
    searchTerm,
    handleSearch
  } = useStarWarsData<Film>(fetchFilms);

  if (isLoading && films.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="page-container">
      <SectionTitle
        title="Films"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Films...'
      />
      
      <div className="films-placeholder">
        <p>Film components will be implemented soon!</p>
        <ul>
          {films.map(film => (
            <li key={film.url} style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>
              {film.title} (Episode {film.episode_id})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilmsPage;