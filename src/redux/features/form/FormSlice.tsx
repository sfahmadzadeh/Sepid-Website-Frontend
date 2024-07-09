import { RegistrationFormType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetFormOutputType = RegistrationFormType;

export const FormSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getForm: builder.query<GetFormOutputType, { formId: string }>({
      providesTags: (result) => [{ type: 'form', id: result.id }],
      query: ({ formId }) => `fsm/form/${formId}/`,
      transformResponse: (response: any): GetFormOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetFormQuery,
} = FormSlice;
