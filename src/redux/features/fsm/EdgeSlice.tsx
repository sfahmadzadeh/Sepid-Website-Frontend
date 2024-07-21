import { FSMEdgeType, FSMStateType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type UpdateFSMEdgeInputType = {
  fsmEdgeId: string;
} & FSMStateType;

type UpdateFSMEdgeOutputType = FSMEdgeType;

type CreateFSMEdgeInputType = {
  tail: string;
  head: string;
  is_visible: boolean;
  is_back_enabled: boolean;
};

type CreateFSMEdgeOutputType = {

}

export const EdgeSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFSMEdge: builder.mutation<CreateFSMEdgeOutputType, CreateFSMEdgeInputType>({
      invalidatesTags: ['fsm-edges'],
      query: ({ ...body }) => ({
        url: `/fsm/edge/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): CreateFSMEdgeOutputType => {
        return response;
      },
    }),

    updateFSMEdge: builder.mutation<UpdateFSMEdgeOutputType, UpdateFSMEdgeInputType>({
      invalidatesTags: ['fsm-edges', 'player-transited-path'],
      query: ({ fsmEdgeId, ...body }) => ({
        url: `/fsm/edge/${fsmEdgeId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMEdgeOutputType => {
        return response;
      },
    }),

    deleteFSMEdge: builder.mutation<any, { fsmEdgeId: string }>({
      invalidatesTags: ['fsm-edges', 'player-transited-path'],
      query: ({ fsmEdgeId }) => ({
        url: `/fsm/edge/${fsmEdgeId}/`,
        method: 'DELETE',
      }),
    }),
  })
});

export const {
  useCreateFSMEdgeMutation,
  useUpdateFSMEdgeMutation,
  useDeleteFSMEdgeMutation,
} = EdgeSlice;
