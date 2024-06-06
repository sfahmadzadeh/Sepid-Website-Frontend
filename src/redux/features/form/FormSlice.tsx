import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { ArticleType } from 'types/redux/article';

type GetFormOutputType = ArticleType;

export const FormSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getForm: builder.query<GetFormOutputType, { formId: string }>({
      providesTags: (result) => [{ type: 'form', id: result.id }],
      query: ({ formId }) => `fsm/registration/${formId}/`,
      transformResponse: (response: any): GetFormOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetFormQuery,
} = FormSlice;
