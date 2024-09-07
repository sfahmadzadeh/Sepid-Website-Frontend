import { FileType } from 'commons/types/models';
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
  programSlug: string;
}

type GetProgramMerchandisesPurchasesOutputType = FileType;

export const ReportSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getFormRespondentsInfoFile: builder.mutation<GetFormRespondentsInfoOutputType, GetFormRespondentsInfoInputType>({
      invalidatesTags: ['programs'],
      query: ({ formId }) => ({
        url: `/report/form-respondents-info/`,
        method: 'POST',
        body: {
          form_id: formId
        },
      }),
    }),

    getFormRespondentsAnswersFile: builder.mutation<GetFormRespondentsAnswersOutputType, GetFormRespondentsAnswersInputType>({
      invalidatesTags: ['programs'],
      query: ({ formId }) => ({
        url: `/report/form-respondents-answers/`,
        method: 'POST',
        body: {
          form_id: formId
        },
      }),
    }),

    getProgramMerchandisesPurchasesFile: builder.mutation<GetProgramMerchandisesPurchasesOutputType, GetProgramMerchandisesPurchasesInputType>({
      invalidatesTags: ['programs'],
      query: ({ programSlug }) => ({
        url: `/report/program-merchandises-purchases/`,
        method: 'POST',
        body: {
          program_id: programSlug
        },
      }),
    }),

  })
});

export const {
  useGetFormRespondentsInfoFileMutation,
  useGetFormRespondentsAnswersFileMutation,
  useGetProgramMerchandisesPurchasesFileMutation
} = ReportSlice;
