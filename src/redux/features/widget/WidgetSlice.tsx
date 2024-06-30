import { WidgetType, WidgetTypes } from 'types/global';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type CreateWidgetInputType = {
  paperId: string;
  widgetType: WidgetTypes;
}

type UpdateWidgetInputType = {
  widgetId: string;
  paperId: string;
  widgetType: WidgetTypes;
}

type GetWidgetOutputType = WidgetType;

export const WidgetSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    createWidget: builder.mutation<void, CreateWidgetInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'paper', id: item.paperId }],
      query: ({ widgetType, paperId, ...props }) => ({
        url: `/fsm/widget/`,
        method: 'POST',
        body: {
          widget_type: widgetType,
          paper: paperId,
          ...props,
        }
      }),
    }),

    updateWidget: builder.mutation<void, UpdateWidgetInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'paper', id: item.paperId }],
      query: ({ widgetType, widgetId, paperId, ...props }) => ({
        url: `/fsm/widget/${widgetId}/`,
        method: 'PATCH',
        body: {
          widget_id: widgetId,
          widget_type: widgetType,
          paper: paperId,
          ...props,
        }
      }),
    }),

    getWidget: builder.query<GetWidgetOutputType, { widgetId: string }>({
      providesTags: (result, error, item) => [{ type: 'widget', id: item.widgetId }],
      query: ({ widgetId }) => `fsm/widget/${widgetId}/`,
      transformResponse: (response: any): GetWidgetOutputType => {
        return response;
      },
    }),

    deleteWidget: builder.mutation<void, { widgetId: string, paperId: string }>({
      invalidatesTags: (result, error, item) => [{ type: 'paper', id: item.paperId }],
      query: ({ widgetId }) => ({
        url: `/fsm/widget/${widgetId}/`,
        method: 'DELETE',
      }),
    }),

  })
});

export const {
  useCreateWidgetMutation,
  useUpdateWidgetMutation,
  useGetWidgetQuery,
  useDeleteWidgetMutation,
} = WidgetSlice;
