import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FilmBaziBackendURL } from './consts';

interface DiscountCodeResponse {
  code: string;
}

const useGetDiscountCode = () => {
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useSelector((state: any) => state.account.accessToken);

  type GetDiscountCodePropsType = {
    filmId: number;
    cityId: number;
  }

  const getDiscountCode = async ({ filmId, cityId }: GetDiscountCodePropsType) => {
    setLoading(true);
    setError(null);

    try {
      const headers = new Headers();
      if (accessToken) {
        headers.append('Authorization', `JWT ${accessToken}`);
      }

      const response = await fetch(`${FilmBaziBackendURL}films/discount-codes/get_discount_code?film=${filmId}&city=${cityId}`, {
        headers: headers,
      });

      const data: Partial<DiscountCodeResponse> = await response.json();

      if (!response.ok) {
        throw new Error(data['error'] || 'Failed to fetch discount code');
      }

      setDiscountCode(data.code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { getDiscountCode, discountCode, loading, error };
};

export default useGetDiscountCode;