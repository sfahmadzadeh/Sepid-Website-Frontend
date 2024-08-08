import { MerchandiseType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetMerchandiseInputType = {
  merchandiseId: string;
}

type GetMerchandiseOutputType = MerchandiseType;

type AddMerchandiseToProgramInputType = {
  programId: string;
} & Partial<MerchandiseType>

type AddMerchandiseToProgramOutputType = MerchandiseType;

type UpdateMerchandiseInputType = Partial<MerchandiseType>

type UpdateMerchandiseOutputType = MerchandiseType;


export const MerchandiseSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getMerchandise: builder.query<GetMerchandiseOutputType, GetMerchandiseInputType>({
      providesTags: ['merchandise'],
      query: ({ merchandiseId }) => `sales/merchandise/${merchandiseId}/`,
      transformResponse: (response: any): GetMerchandiseOutputType => {
        return response;
      },
    }),

    addMerchandiseToProgram: builder.mutation<AddMerchandiseToProgramOutputType, AddMerchandiseToProgramInputType>({
      invalidatesTags: ['program'],
      query: ({ programId, ...body }) => ({
        url: `sales/merchandise/add_to_program/`,
        method: 'POST',
        body: {
          program_id: programId,
          ...body,
        }
      }),
    }),

    updateMerchandise: builder.mutation<UpdateMerchandiseOutputType, UpdateMerchandiseInputType>({
      invalidatesTags: ['merchandise'],
      query: ({ id, ...body }) => ({
        url: `sales/merchandise/${id}/`,
        method: 'PATCH',
        body,
      }),
    }),
  })
});

export const {
  useGetMerchandiseQuery,
  useAddMerchandiseToProgramMutation,
  useUpdateMerchandiseMutation,
} = MerchandiseSlice;
