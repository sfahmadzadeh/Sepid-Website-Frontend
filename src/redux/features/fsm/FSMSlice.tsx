import { FSMStateType, FSMType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type UpdateFSMInputType = {
  fsmId: string;
} & FSMType;

type UpdateFSMOutputType = {

}

type CreateFSMInputType = {
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

type GetFSMInputType = {
  fsmId: string;
};

type GetFSMOutputType = FSMType;


type GetFSMStatesOutputType = FSMStateType[];



export const FSMSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFSM: builder.mutation<CreateFSMOutputType, CreateFSMInputType>({
      invalidatesTags: ['fsms'],
      query: ({ ...body }) => ({
        url: `/fsm/fsm/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): CreateFSMOutputType => {
        return response;
      },
    }),

    updateFSM: builder.mutation<UpdateFSMOutputType, UpdateFSMInputType>({
      invalidatesTags: ['fsm', 'fsms'],
      query: ({ fsmId, ...body }) => ({
        url: `/fsm/fsm/${fsmId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMOutputType => {
        return response;
      },
    }),


    getFSM: builder.query<GetFSMOutputType, GetFSMInputType>({
      providesTags: ['fsm'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/`,
      transformResponse: (response: any): GetFSMOutputType => {
        return response;
      },
    }),

    getFSMs: builder.query<GetFSMsOutputType, GetFSMsInputType>({
      providesTags: ['fsms'],
      query: ({ programId, pageNumber = 1, isPrivate }) => `fsm/fsm/?program=${programId}&page=${pageNumber}${isPrivate != null ? `&is_private=${isPrivate}` : ''}`,
      transformResponse: (response: any): GetFSMsOutputType => {
        return {
          fsms: response.results,
          count: response.count,
        };
      },
    }),

    getFSMStates: builder.query<GetFSMStatesOutputType, { fsmId: string }>({
      providesTags: ['fsm-states'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/get_states/`,
      transformResponse: (response: any): GetFSMStatesOutputType => {
        return response;
      },
    }),

    getFSMEdges: builder.query<GetFSMStatesOutputType, { fsmId: string }>({
      providesTags: ['fsm-edges'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/get_edges/`,
      transformResponse: (response: any): GetFSMStatesOutputType => {
        return response;
      },
    }),

    softDeleteFSM: builder.mutation<any, { fsmId: string }>({
      invalidatesTags: ['fsms'],
      query: ({ fsmId }) => `fsm/fsm/${fsmId}/soft_remove_fsm/`
    }),
  })
});

export const {
  useUpdateFSMMutation,
  useCreateFSMMutation,
  useGetFSMQuery,
  useGetFSMsQuery,
  useSoftDeleteFSMMutation,
  useGetFSMStatesQuery,
  useGetFSMEdgesQuery,
} = FSMSlice;
