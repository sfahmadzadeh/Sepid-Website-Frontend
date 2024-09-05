import { FSMEdgeType, FSMStateType } from 'commons/types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type UpdateFSMEdgeInputType = {
  fsmEdgeId: string;
} & Partial<FSMEdgeType>;

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
      invalidatesTags: ['fsm-edges', 'fsm-state'],
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
      invalidatesTags: ['fsm-edges', 'player-transited-path', 'fsm-state'],
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
      invalidatesTags: ['fsm-edges', 'player-transited-path', 'fsm-state'],
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
