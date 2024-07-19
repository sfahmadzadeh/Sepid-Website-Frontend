import { AnswerType, RegistrationFormType, RegistrationReceiptType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetFormOutputType = RegistrationFormType;

type SubmitFormInputType = {
  formId: string;
  answer_sheet_type: 'RegistrationReceipt';
  answers: AnswerType[];
}

type SubmitFormOutputType = RegistrationReceiptType;

export const FormSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getForm: builder.query<GetFormOutputType, { formId: string }>({
      providesTags: (result) => [{ type: 'form', id: result.id }],
      query: ({ formId }) => `fsm/form/${formId}/`,
      transformResponse: (response: any): GetFormOutputType => {
        return response;
      },
    }),

    submitForm: builder.mutation<SubmitFormOutputType, SubmitFormInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'receipt', id: item.formId }],
      query: ({ formId, ...body }) => ({
        url: `fsm/form/${formId}/register/`,
        method: 'POST',
        body,
      }),
    }),

  })
});

export const {
  useGetFormQuery,
  useSubmitFormMutation,
} = FormSlice;
