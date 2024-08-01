import { AnswerType, RegistrationFormType, RegistrationReceiptType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetFormOutputType = RegistrationFormType;

type SubmitFormInputType = {
  formId: string;
  answer_sheet_type: 'RegistrationReceipt';
  answers: AnswerType[];
}

type SubmitFormOutputType = RegistrationReceiptType;

type GetFormAnswerSheetOutputType = {
  count: number;
  results: RegistrationReceiptType[];
}

type UpdateFormInputType = Partial<RegistrationFormType>

type UpdateFormOutputType = any;

export const FormSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getForm: builder.query<GetFormOutputType, { formId: string }>({
      providesTags: (result) => [{ type: 'form', id: result?.id }],
      query: ({ formId }) => `fsm/form/${formId}/`,
      transformResponse: (response: any): GetFormOutputType => {
        return response;
      },
    }),

    updateForm: builder.mutation<UpdateFormOutputType, UpdateFormInputType>({
      invalidatesTags: (result, error, item) => [{ type: 'form', id: item.id }],
      query: ({ id, ...body }) => ({
        url: `fsm/form/${id}/`,
        method: 'PATCH',
        body,
      }),
    }),

    getFormAnswerSheets: builder.query<GetFormAnswerSheetOutputType, { formId: string, pageNumber: string }>({
      providesTags: ['receipts'],
      query: ({ formId, pageNumber }) => `fsm/form/${formId}/receipts/?page=${pageNumber}`,
      transformResponse: (response: any): GetFormAnswerSheetOutputType => {
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
  useUpdateFormMutation,
  useGetFormAnswerSheetsQuery,
  useSubmitFormMutation,
} = FormSlice;
