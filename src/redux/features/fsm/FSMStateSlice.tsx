import { FSMStateType, FSMType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type UpdateFSMStateInputType = {
  fsmStateId: string;
} & FSMStateType;

type UpdateFSMStateOutputType = FSMStateType;

type CreateFSMStateInputType = {
  fsmId: string;
  body: any;
};

type CreateFSMStateOutputType = {

}

type GetFSMStateOutputType = FSMStateType;


export const FSMStateSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFSMState: builder.mutation<CreateFSMStateOutputType, CreateFSMStateInputType>({
      invalidatesTags: ['fsm-states'],
      query: ({ ...body }) => ({
        url: `/fsm/state/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): CreateFSMStateOutputType => {
        return response;
      },
    }),

    updateFSMState: builder.mutation<UpdateFSMStateOutputType, UpdateFSMStateInputType>({
      invalidatesTags: ['fsm-state', 'fsm-states'],
      query: ({ fsmStateId, ...body }) => ({
        url: `/fsm/state/${fsmStateId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMStateOutputType => {
        return response;
      },
    }),

    getFSMState: builder.query<GetFSMStateOutputType, { fsmStateId: string }>({
      providesTags: ['fsm-state'],
      query: ({ fsmStateId }) => `fsm/state/${fsmStateId}/`,
      transformResponse: (response: any): GetFSMStateOutputType => {
        return response;
      },
    }),

    deleteFSMState: builder.mutation<any, { fsmStateId: string }>({
      invalidatesTags: ['fsm-states'],
      query: ({ fsmStateId }) => ({
        url: `/fsm/state/${fsmStateId}/`,
        method: 'DELETE',
      }),
    }),
  })
});

export const {
  useCreateFSMStateMutation,
  useUpdateFSMStateMutation,
  useGetFSMStateQuery,
  useDeleteFSMStateMutation,
} = FSMStateSlice;
