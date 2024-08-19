import { FileType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetFormRespondentsInfoInputType = {
  formId: string;
}

type GetFormRespondentsInfoOutputType = FileType;

type GetFormRespondentsAnswersInputType = {
  formId: string;
}

type GetFormRespondentsAnswersOutputType = FileType;

type GetProgramMerchandisesPurchasesInputType = {
  programId: string;
}

type GetProgramMerchandisesPurchasesOutputType = FileType;

export const ReportSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getFormRespondentsInfo: builder.mutation<GetFormRespondentsInfoOutputType, GetFormRespondentsInfoInputType>({
      invalidatesTags: ['programs'],
      query: ({ formId }) => ({
        url: `/report/form-respondents-info/`,
        method: 'POST',
        body: {
          form_id: formId
        },
      }),
    }),

    getFormRespondentsAnswers: builder.mutation<GetFormRespondentsAnswersOutputType, GetFormRespondentsAnswersInputType>({
      invalidatesTags: ['programs'],
      query: ({ formId }) => ({
        url: `/report/form-respondents-answers/`,
        method: 'POST',
        body: {
          form_id: formId
        },
      }),
    }),

    getProgramMerchandisesPurchases: builder.mutation<GetProgramMerchandisesPurchasesOutputType, GetProgramMerchandisesPurchasesInputType>({
      invalidatesTags: ['programs'],
      query: ({ programId }) => ({
        url: `/report/program-merchandises-purchases/`,
        method: 'POST',
        body: {
          program_id: programId
        },
      }),
    }),

  })
});

export const {
  useGetFormRespondentsInfoMutation,
  useGetFormRespondentsAnswersMutation,
  useGetProgramMerchandisesPurchasesMutation
} = ReportSlice;
