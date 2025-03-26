import React from 'react';
import CharacterList from '../../components/characters/CharacterList';
import useStarWarsData from '../../hooks/useStarWarsData';
import { fetchCharacters } from '../../services/api';
import { Character } from '../../interfaces';
import SectionTitle from '../../components/common/SectionTitle';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const CharactersPage: React.FC = () => {
  const {
    data: characters,
    isLoading,
    error,
    searchTerm,
    handleSearch,
    loadNextPage,
    loadPrevPage,
    hasNextPage,
    hasPrevPage
  } = useStarWarsData<Character>(fetchCharacters);

  return (
    <div className="page-container">
        <SectionTitle
        title="Characters"
        onSearch={handleSearch}
        searchTerm={searchTerm}
        placeholder='Search Characters...'
      />

      {isLoading ?(
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error}/>
      ) :(
      
      <CharacterList
        characters={characters}
        isLoading={isLoading}
        error={error}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onNextPage={loadNextPage}
        onPrevPage={loadPrevPage}
      />
      )}
    </div>
  );
};

export default CharactersPage;