import React from 'react';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchFilms } from '../../services/api';
import { Film } from '../../interfaces';
import SectionTitle from '../../components/common/SectionTitle';
import FilmList from '../../components/films/FilmList';

const FilmsPage: React.FC = () => {
  const {
    data: films,
    isLoading,
    error,
    searchTerm,
    handleSearch
  } = useStarWarsData<Film>(fetchFilms);

  return (
    <div className="page-container">
      <SectionTitle
        title="Films"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Films...'
      />
      
      <FilmList
        films={films}
        isLoading={isLoading}
        error={error}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default FilmsPage;