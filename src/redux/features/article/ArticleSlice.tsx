import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { ArticleType } from 'types/redux/article';

type GetArticleOutputType = ArticleType;

export const ArticleSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getArticle: builder.query<GetArticleOutputType, { articleId: string }>({
      providesTags: (result) => [{ type: 'article', id: result.id }],
      query: ({ articleId }) => `fsm/article/${articleId}/`,
      transformResponse: (response: any): GetArticleOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetArticleQuery,
} = ArticleSlice;
