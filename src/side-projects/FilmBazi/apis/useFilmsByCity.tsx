import { useState, useEffect } from 'react';
import { FilmBaziBackendURL } from './consts';
import { FilmType } from '../models';

const useFilmsByCity = (cityId: number) => {
  const [films, setFilms] = useState<FilmType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch(`${FilmBaziBackendURL}films/films/by_city/?city_id=${cityId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: FilmType[] = await response.json();
        setFilms(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };
    if (cityId) {
      fetchFilms();
    }
  }, [cityId]);

  return { films, loading, error };
};

export default useFilmsByCity;