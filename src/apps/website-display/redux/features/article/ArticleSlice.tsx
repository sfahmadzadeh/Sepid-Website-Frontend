import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { ArticleType } from 'commons/types/redux/article';

type GetArticleOutputType = ArticleType;

type GetArticlesInputType = {
  pageNumber: number;
}

type GetArticlesOutputType = {
  count: number;
  articles: ArticleType[];
}

export const ArticleSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getArticle: builder.query<GetArticleOutputType, { articleId: string }>({
      providesTags: (result, error, item) => {
        if (!error) {
          return ([{ type: 'article', id: result.id }]);
        }
      },
      query: ({ articleId }) => `fsm/article/${articleId}/`,
      transformResponse: (response: any): GetArticleOutputType => {
        return response;
      },
    }),

    getArticles: builder.query<GetArticlesOutputType, GetArticlesInputType>({
      providesTags: ['articles'],
      query: ({ pageNumber }) => `fsm/article/?page=${pageNumber}`,
      transformResponse: (response: any): GetArticlesOutputType => {
        return {
          count: response.count,
          articles: response.results,
        }
      },
    })
  })
});

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
} = ArticleSlice;
