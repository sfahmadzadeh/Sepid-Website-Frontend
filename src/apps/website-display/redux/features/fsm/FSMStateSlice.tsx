import { FSMStateType, FSMType } from 'commons/types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type UpdateFSMStateInputType = {
  fsmStateId: string;
} & Partial<FSMStateType>;

type UpdateFSMStateOutputType = Partial<FSMStateType>;

type CreateFSMStateInputType = {
  fsmId: string;
} & any;

type CreateFSMStateOutputType = {

}

type GetFSMStateOutputType = FSMStateType;


export const FSMStateSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFSMState: builder.mutation<CreateFSMStateOutputType, CreateFSMStateInputType>({
      invalidatesTags: ['fsm-states'],
      query: ({ fsmId, ...body }) => ({
        url: `/fsm/state/`,
        method: 'POST',
        body: {
          ...body,
          fsm: fsmId,
        },
      }),
      transformResponse: (response: any): CreateFSMStateOutputType => {
        return response;
      },
    }),

    updateFSMState: builder.mutation<UpdateFSMStateOutputType, UpdateFSMStateInputType>({
      invalidatesTags: (result, error, item) => {
        if (!error) {
          return ([
            { type: 'fsm-state', id: result.id },
            'fsm-states',
            'player-transited-path',
          ]);
        }
      },
      query: ({ fsmStateId, ...body }) => ({
        url: `/fsm/state/${fsmStateId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMStateOutputType => {
        return response;
      },
    }),

    deleteFSMState: builder.mutation<any, { fsmStateId: string }>({
      invalidatesTags: ['fsm-states', 'player-transited-path'],
      query: ({ fsmStateId }) => ({
        url: `/fsm/state/${fsmStateId}/`,
        method: 'DELETE',
      }),
    }),

    getFSMState: builder.query<GetFSMStateOutputType, { fsmStateId: string }>({
      providesTags: (result, error, item) => {
        if (!error) {
          return ([{ type: 'fsm-state', id: result.id }]);
        }
      },
      query: ({ fsmStateId }) => `fsm/state/${fsmStateId}/`,
      transformResponse: (response: any): GetFSMStateOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useCreateFSMStateMutation,
  useUpdateFSMStateMutation,
  useGetFSMStateQuery,
  useDeleteFSMStateMutation,
} = FSMStateSlice;
