import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { HintType } from 'types/global';

type DeleteFSMStateHintInputType = {
  fsmStateId: string;
  hintId: string;
};

type DeleteFSMStateHintOutputType = any;

type CreateFSMStateHintInputType = {
  fsmStateId: string;
};

type CreateFSMStateHintOutputType = HintType;


type CreateWidgetHintInputType = {
  widgetId: string;
  paperId: string;
};

type CreateWidgetHintOutputType = HintType;

type DeleteWidgetHintInputType = {
  paperId: string;
  hintId: string;
};

type DeleteWidgetHintOutputType = any;

export const HintSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    createFSMStateHint: builder.mutation<CreateFSMStateHintOutputType, CreateFSMStateHintInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'fsm-state', id: item.fsmStateId }],
      query: ({ fsmStateId, ...body }) => ({
        url: `/fsm/hint/`,
        method: 'POST',
        body: {
          ...body,
          reference: fsmStateId,
        },
      }),
      transformResponse: (response: any): CreateFSMStateHintOutputType => {
        return response;
      },
    }),

    deleteFSMStateHint: builder.mutation<DeleteFSMStateHintOutputType, DeleteFSMStateHintInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'fsm-state', id: item.fsmStateId }],
      query: ({ hintId }) => ({
        url: `/fsm/hint/${hintId}/`,
        method: 'DELETE',
      }),
      transformResponse: (response: any): DeleteFSMStateHintOutputType => {
        return response;
      },
    }),


    createWidgetHint: builder.mutation<CreateWidgetHintOutputType, CreateWidgetHintInputType>({
      // todo: it should invalidate 'widget' not 'paper'
      invalidatesTags: (result, error, item) => [{ type: 'paper', id: item.paperId }],
      query: ({ widgetId, ...body }) => ({
        url: `/fsm/widget-hint/`,
        method: 'POST',
        body: {
          ...body,
          reference: widgetId,
        },
      }),
      transformResponse: (response: any): CreateWidgetHintOutputType => {
        return response;
      },
    }),

    deleteWidgetHint: builder.mutation<DeleteWidgetHintOutputType, DeleteWidgetHintInputType>({
      // todo: it should invalidate 'widget' not 'paper'
      invalidatesTags: (result, error, item) => [{ type: 'paper', id: item.paperId }],
      query: ({ hintId }) => ({
        url: `/fsm/widget-hint/${hintId}/`,
        method: 'DELETE',
      }),
      transformResponse: (response: any): DeleteWidgetHintOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useCreateFSMStateHintMutation,
  useDeleteFSMStateHintMutation,
  useCreateWidgetHintMutation,
  useDeleteWidgetHintMutation,
} = HintSlice;
