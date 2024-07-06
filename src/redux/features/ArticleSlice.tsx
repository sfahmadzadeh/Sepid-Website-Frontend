import { ProgramType } from 'types/models';
import { ManageContentServiceApi } from './ManageContentServiceApiSlice';
import { ArticleType } from 'types/redux/article';

type GetArticlesInputType = {
  websiteName: string;
  pageNumber: number;
}

type GetArticlesOutputType = {
  count: number;
  articles: ArticleType[];
}

export const ArticleSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<GetArticlesOutputType, GetArticlesInputType>({
      query: ({ websiteName, pageNumber }) => `fsm/article/?website=${websiteName}&page=${pageNumber}`,
      transformResponse: (respons: any): GetArticlesOutputType => {
        return {
          count: respons.count,
          articles: respons.results,
        }
      },
    })
  })
});

export const { useGetArticlesQuery } = ArticleSlice;
