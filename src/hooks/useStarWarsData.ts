import { useState, useEffect } from 'react';
import { ApiResponse } from '../interfaces';

interface UseStarWarsDataOptions {
  initialSearchTerm?: string;
}

type FetchFunction<T> = (searchTerm?: string) => Promise<ApiResponse<T>>;

function useStarWarsData<T>(
  fetchFunction: FetchFunction<T>,
  options: UseStarWarsDataOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(options.initialSearchTerm || '');
  const [count, setCount] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const fetchData = async (search?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchFunction(search);
      setData(response.results);
      setCount(response.count);
      setNextPage(response.next);
      setPrevPage(response.previous);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const loadNextPage = async () => {
    if (!nextPage) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(nextPage);
      if (!response.ok) {
        throw new Error('Failed to fetch next page');
      }
      const nextData = await response.json();
      setData(nextData.results);
      setNextPage(nextData.next);
      setPrevPage(nextData.previous);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPrevPage = async () => {
    if (!prevPage) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(prevPage);
      if (!response.ok) {
        throw new Error('Failed to fetch previous page');
      }
      const prevData = await response.json();
      setData(prevData.results);
      setNextPage(prevData.next);
      setPrevPage(prevData.previous);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    searchTerm,
    count,
    handleSearch,
    loadNextPage,
    loadPrevPage,
    hasNextPage: !!nextPage,
    hasPrevPage: !!prevPage,
    refresh: () => fetchData(searchTerm)
  };
}

export default useStarWarsData;