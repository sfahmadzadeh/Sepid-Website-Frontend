import { ProgramType } from 'types/models';
import { ManageContentServiceApi } from './ManageContentServiceApiSlice';

type GetProgramsInputType = {
  websiteName: string | undefined;
  pageNumber?: number;
  isPrivate?: boolean;
}

type GetProgramsOutputType = {
  programs: ProgramType[];
  count: number;
}

export const ProgramSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getPrograms: builder.query<GetProgramsOutputType, GetProgramsInputType>({
      providesTags: ['programs'],
      query: ({ websiteName, pageNumber = 1, isPrivate }) => `fsm/event/?website=${websiteName}&page=${pageNumber}${isPrivate != null ? `&is_private=${isPrivate}` : ''}`,
      transformResponse: (respons: any): GetProgramsOutputType => {
        return {
          programs: respons.results,
          count: respons.count,
        };
      },
    })
  })
});

export const { useGetProgramsQuery } = ProgramSlice;
