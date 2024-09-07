import { UserInfoType } from 'commons/types/profile';
import { ManageContentServiceApi } from '../../ManageContentServiceApiSlice';
import { AnswerType } from 'commons/types/models';

type GetAnswerSheetAnswersInputType = {
  answerSheetId: string;
}

type GetAnswerSheetAnswersOutputType = AnswerType[]

type GetQuestionAnswersInputType = {
  questionId: string;
}

type GetQuestionAnswersOutputType = AnswerType[];

export const AnswerSheetSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getAnswerSheetAnswers: builder.query<GetAnswerSheetAnswersOutputType, GetAnswerSheetAnswersInputType>({
      providesTags: ['user-profile'],
      query: ({ answerSheetId }) => ({
        url: `response/answers/answer_sheet_answers/?answer_sheet=${answerSheetId}`,
        method: 'GET',
      }),
    }),

    getWidgetAnswers: builder.query<GetQuestionAnswersOutputType, GetQuestionAnswersInputType>({
      providesTags: ['user-profile'],
      query: ({ questionId }) => ({
        url: `response/answers/question_answers/?question=${questionId}/`,
        method: 'GET',
      }),
    }),
  })
});

export const {
  useGetAnswerSheetAnswersQuery,
  useGetWidgetAnswersQuery,
} = AnswerSheetSlice;
