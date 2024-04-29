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

type UpdateProgramInputType = {
  programId: string;
  body: any;
};

type UpdateProgramOutputType = {

}

type CreateProgramInputType = {
  websiteName: string;
  body: any;
};

type CreateProgramOutputType = {

}



export const ProgramSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    createProgram: builder.mutation<CreateProgramOutputType, CreateProgramInputType>({
      invalidatesTags: ['programs'],
      query: ({ websiteName, ...body }) => ({
        url: `/fsm/event/`,
        method: 'POST',
        body: {
          ...body,
          website: websiteName,
        },
      }),
      transformResponse: (response: any): UpdateProgramOutputType => {
        return response;
      },
    }),

    updateProgram: builder.mutation<UpdateProgramOutputType, UpdateProgramInputType>({
      invalidatesTags: ['programs'],
      query: ({ programId, ...body }) => ({
        url: `/fsm/event/${programId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateProgramOutputType => {
        return response;
      },
    }),

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

export const {
  useGetProgramsQuery,
  useUpdateProgramMutation,
  useCreateProgramMutation,
} = ProgramSlice;
