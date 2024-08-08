import { MerchandiseType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetProgramMerchandisesInputType = {
  programId: string;
}

type GetProgramMerchandisesOutputType = MerchandiseType[];

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
    getProgramMerchandises: builder.query<GetProgramMerchandisesOutputType, GetProgramMerchandisesInputType>({
      providesTags: ['merchandise'],
      query: ({ programId }) => `sales/merchandise/program/?program=${programId}`,
      transformResponse: (response: any): GetProgramMerchandisesOutputType => {
        return response;
      },
    }),

    getMerchandise: builder.query<GetMerchandiseOutputType, GetMerchandiseInputType>({
      providesTags: ['merchandise'],
      query: ({ merchandiseId }) => `sales/merchandise/${merchandiseId}/`,
      transformResponse: (response: any): GetMerchandiseOutputType => {
        return response;
      },
    }),

    createMerchandise: builder.mutation<AddMerchandiseToProgramOutputType, AddMerchandiseToProgramInputType>({
      invalidatesTags: ['program'],
      query: ({ programId, ...body }) => ({
        url: `sales/merchandise/`,
        method: 'POST',
        body: {
          program: programId,
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
  useGetProgramMerchandisesQuery,
  useGetMerchandiseQuery,
  useCreateMerchandiseMutation,
  useUpdateMerchandiseMutation,
} = MerchandiseSlice;
