import { FSMType } from 'types/models';
import { ManageContentServiceApi } from './ManageContentServiceApiSlice';

type UpdateFSMInputType = {
  fsmId: string;
} & FSMType;

type UpdateFSMOutputType = {

}

type CreateFSMInputType = {
  programId: string;
  body: any;
};

type CreateFSMOutputType = {

}

type GetFSMsInputType = {
  programId: string;
  pageNumber: number;
  isPrivate?: boolean;
};

type GetFSMsOutputType = {
  fsms: FSMType[];
  count: number;
}


export const FSMSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFSM: builder.mutation<CreateFSMOutputType, CreateFSMInputType>({
      invalidatesTags: ['fsms'],
      query: ({ programId, ...body }) => ({
        url: `/fsm/fsm/`,
        method: 'POST',
        body: {
          ...body,
          program: programId,
        },
      }),
      transformResponse: (response: any): CreateFSMOutputType => {
        return response;
      },
    }),

    updateFSM: builder.mutation<UpdateFSMOutputType, UpdateFSMInputType>({
      invalidatesTags: ['fsms'],
      query: ({ fsmId, ...body }) => ({
        url: `/fsm/fsm/${fsmId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMOutputType => {
        return response;
      },
    }),

    getFSMs: builder.query<GetFSMsOutputType, GetFSMsInputType>({
      providesTags: ['programs'],
      query: ({ programId, pageNumber = 1, isPrivate }) => `fsm/fsm/?event=${programId}&page=${pageNumber}${isPrivate != null ? `&is_private=${isPrivate}` : ''}`,
      transformResponse: (respons: any): GetFSMsOutputType => {
        return {
          fsms: respons.results,
          count: respons.count,
        };
      },
    })
  })
});

export const {
  useUpdateFSMMutation,
  useCreateFSMMutation,
  useGetFSMsQuery,
} = FSMSlice;
