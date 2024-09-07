import { CurrencyType } from 'commons/types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetCurrenciesInputType = {};

type GetCurrenciesOutputType = CurrencyType[];

export const AttributeSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    // تعیین اون سه تا اتربیوت برای یک ویجت
    // تعیین اون سه تا اتربیوت برای یک پیپر
    // تعیین اون سه تا اتربیوت برای یک راهنمایی

    getCurrencies: builder.query<GetCurrenciesOutputType, GetCurrenciesInputType>({
      providesTags: ['currencies'],
      query: () => `attributes/currencies/`,
      transformResponse: (response: any): GetCurrenciesOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetCurrenciesQuery,
} = AttributeSlice;
