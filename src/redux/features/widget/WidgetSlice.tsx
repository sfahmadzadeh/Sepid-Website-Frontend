import { WidgetType, WidgetTypes } from 'types/global';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type CreateWidgetInputType = {
  fsmStateId: string;
  widgetType: WidgetTypes;
}

type UpdateWidgetInputType = {
  widgetId: string;
  fsmStateId: string;
  widgetType: WidgetTypes;
}

type GetWidgetOutputType = {}

export const WidgetSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    createWidget: builder.mutation<void, CreateWidgetInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'fsm-state', id: item.fsmStateId }],
      query: ({ widgetType, fsmStateId, ...props }) => ({
        url: `/fsm/widget/`,
        method: 'POST',
        body: {
          widget_type: widgetType,
          paper_id: fsmStateId,
          ...props,
        }
      }),
    }),

    updateWidget: builder.mutation<void, UpdateWidgetInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'fsm-state', id: item.fsmStateId }, { type: 'widget', id: item.widgetId }],
      query: ({ widgetType, widgetId, fsmStateId, ...props }) => ({
        url: `/fsm/widget/${widgetId}/`,
        method: 'PATCH',
        body: {
          widget_id: widgetId,
          widget_type: widgetType,
          paper_id: fsmStateId,
          ...props,
        }
      }),
    }),

    getWidget: builder.query<GetWidgetOutputType, { widgetId: string }>({
      providesTags: (result, error, item) => [{ type: 'widget', id: item.widgetId }],
      query: ({ widgetId }) => `fsm/widget/${widgetId}/`,
      transformResponse: (respons: any): GetWidgetOutputType => {
        return respons;
      },
    }),

    deleteWidget: builder.mutation<void, { widgetId: string, fsmStateId: string }>({
      invalidatesTags: (result, error, item) => [{ type: 'fsm-state', id: item.fsmStateId }],
      query: ({ widgetId }) => ({
        url: `/fsm/widget/${widgetId}/`,
        method: 'DELETE',
      }),
    }),

    makeWidgetFileEmpty: builder.mutation<WidgetType, { widgetId: string }>({
      invalidatesTags: (result) => [{ type: 'widget', id: result.id }],
      query: ({ widgetId }) => ({
        url: `/fsm/widget/${widgetId}/make_widget_file_empty/`,
        method: 'GET',
      }),
    }),

  })
});

export const {
  useCreateWidgetMutation,
  useUpdateWidgetMutation,
  useGetWidgetQuery,
  useDeleteWidgetMutation,
  useMakeWidgetFileEmptyMutation,
} = WidgetSlice;
