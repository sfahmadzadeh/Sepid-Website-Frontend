import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FilmBaziBackendURL } from './consts';
import { FilmType } from '../types';

const useFilmsByCity = ({ cityId }: { cityId: number }) => {
  const [films, setFilms] = useState<FilmType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const headers = new Headers();
        if (accessToken) {
          headers.append('Authorization', `JWT ${accessToken}`);
        }

        const response = await fetch(`${FilmBaziBackendURL}films/films/by_city/?city_id=${cityId}`, {
          headers: headers,
        });
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
    if (cityId && accessToken) {
      fetchFilms();
    }
  }, [cityId, accessToken]);

  return { films, loading, error };
};

export default useFilmsByCity;