import { FileType, ProgramType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetRegistrationFormRegistrantsInfoInputType = {
  formId: string;
}

type GetRegistrationFormRegistrantsInfoOutputType = FileType;

type GetRegistrationFormAnswersInputType = {
  formId: string;
}

type GetRegistrationFormAnswersOutputType = FileType;

export const ReportSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getRegistrationFormRegistrantsInfo: builder.mutation<GetRegistrationFormRegistrantsInfoOutputType, GetRegistrationFormRegistrantsInfoInputType>({
      invalidatesTags: ['programs'],
      query: ({ formId }) => ({
        url: `/report/registration-form-registrants/`,
        method: 'POST',
        body: {
          form_id: formId
        },
      }),
    }),

    getRegistrationFormAnswers: builder.mutation<GetRegistrationFormAnswersOutputType, GetRegistrationFormAnswersInputType>({
      invalidatesTags: ['programs'],
      query: ({ formId }) => ({
        url: `/report/registration-form-answers/`,
        method: 'POST',
        body: {
          form_id: formId
        },
      }),
    }),

  })
});

export const {
  useGetRegistrationFormRegistrantsInfoMutation,
  useGetRegistrationFormAnswersMutation,
} = ReportSlice;
