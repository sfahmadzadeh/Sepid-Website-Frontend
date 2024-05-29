import { WidgetType, WidgetTypes } from 'types/global';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetWidgetOutputType = {

}

export const WidgetSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getWidget: builder.query<GetWidgetOutputType, { widgetId: string }>({
      providesTags: ['widget'],
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
  useGetWidgetQuery,
  useDeleteWidgetMutation,
  useMakeWidgetFileEmptyMutation,
} = WidgetSlice;
