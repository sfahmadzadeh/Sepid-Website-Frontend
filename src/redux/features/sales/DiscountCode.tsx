import { DiscountCodeType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type CreateDiscountCodeInputType = Partial<DiscountCodeType>

type CreateDiscountCodeOutputType = DiscountCodeType;

type DeleteDiscountCodeInputType = {
  discountCodeId: string;
}

type DeleteDiscountCodeOutputType = void;

type GetProgramDiscountCodesInputType = {
  programSlug: string;
}

type GetProgramDiscountCodesOutputType = DiscountCodeType[];

export const MerchandiseSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    createDiscountCode: builder.mutation<CreateDiscountCodeOutputType, CreateDiscountCodeInputType>({
      invalidatesTags: ['discount-codes'],
      query: ({ ...body }) => ({
        url: `sales/discount_code/`,
        method: 'POST',
        body: {
          ...body,
        }
      }),
    }),

    deleteDiscountCode: builder.mutation<DeleteDiscountCodeOutputType, DeleteDiscountCodeInputType>({
      invalidatesTags: ['discount-codes'],
      query: ({ discountCodeId }) => ({
        url: `sales/discount_code/${discountCodeId}/`,
        method: 'DELETE',
      }),
    }),

    getProgramDiscountCodes: builder.query<GetProgramDiscountCodesOutputType, GetProgramDiscountCodesInputType>({
      providesTags: ['discount-codes'],
      query: ({ programSlug }) => `sales/discount_code/program_discount_codes/?program_slug=${programSlug}`,
      transformResponse: (response: any): GetProgramDiscountCodesOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useCreateDiscountCodeMutation,
  useDeleteDiscountCodeMutation,
  useGetProgramDiscountCodesQuery,
} = MerchandiseSlice;
