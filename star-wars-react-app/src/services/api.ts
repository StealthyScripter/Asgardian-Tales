import { ApiResponse, Character, Film, Planet, Species, Starship, Vehicle } from '../interfaces';

const BASE_URL = 'https://swapi.dev/api';

export const fetchCharacters = async (searchTerm?: string): Promise<ApiResponse<Character>> => {
  let url = `${BASE_URL}/people/`;
  if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const fetchCharacter = async (id: string): Promise<Character> => {
  const response = await fetch(`${BASE_URL}/people/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }
  return response.json();
};

export const fetchFilms = async (searchTerm?: string): Promise<ApiResponse<Film>> => {
  let url = `${BASE_URL}/films/`;
  if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch films');
  }
  return response.json();
};

export const fetchFilm = async (id: string): Promise<Film> => {
  const response = await fetch(`${BASE_URL}/films/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch film');
  }
  return response.json();
};

export const fetchSpecies = async (searchTerm?: string): Promise<ApiResponse<Species>> => {
  let url = `${BASE_URL}/species/`;
  if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch species');
  }
  return response.json();
};

export const fetchSpeciesById = async (id: string): Promise<Species> => {
  const response = await fetch(`${BASE_URL}/species/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch species');
  }
  return response.json();
};

export const fetchStarships = async (searchTerm?: string): Promise<ApiResponse<Starship>> => {
  let url = `${BASE_URL}/starships/`;
  if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch starships');
  }
  return response.json();
};

export const fetchStarship = async (id: string): Promise<Starship> => {
  const response = await fetch(`${BASE_URL}/starships/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch starship');
  }
  return response.json();
};

export const fetchVehicles = async (searchTerm?: string): Promise<ApiResponse<Vehicle>> => {
  let url = `${BASE_URL}/vehicles/`;
  if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  return response.json();
};

export const fetchVehicle = async (id: string): Promise<Vehicle> => {
  const response = await fetch(`${BASE_URL}/vehicles/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle');
  }
  return response.json();
};

export const fetchPlanets = async (searchTerm?: string): Promise<ApiResponse<Planet>> => {
  let url = `${BASE_URL}/planets/`;
  if (searchTerm) {
    url += `?search=${encodeURIComponent(searchTerm)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch planets');
  }
  return response.json();
};

export const fetchPlanet = async (id: string): Promise<Planet> => {
  const response = await fetch(`${BASE_URL}/planets/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch planet');
  }
  return response.json();
};

// Helper to extract ID from URL
export const getIdFromUrl = (url: string): string => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : '';
};