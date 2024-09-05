import { ManageContentServiceApi } from "../ManageContentServiceApiSlice";

export const WidgetPositionSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: (builder) => ({
    getWidgetPositionsByPaper: builder.query({
      query: ({ paperId }) => `/fsm/widget-positions/by-paper/${paperId}/`,
      providesTags: (result, error, paperId) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'WidgetPosition', id })),
            { type: 'WidgetPosition', id: 'LIST' },
          ]
          : [{ type: 'WidgetPosition', id: 'LIST' }],
    }),

    saveWidgetPositions: builder.mutation({
      query: ({ positions }) => ({
        url: '/fsm/widget-positions/save-positions/',
        method: 'POST',
        body: { positions },
      }),
      invalidatesTags: [{ type: 'WidgetPosition', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetWidgetPositionsByPaperQuery,
  useSaveWidgetPositionsMutation,
} = WidgetPositionSlice;