import { ProgramType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetProgramsInputType = {
  websiteName: string | undefined;
  pageNumber?: number;
  isPrivate?: boolean;
}

type GetProgramsOutputType = {
  programs: ProgramType[];
  count: number;
}

type GetProgramInputType = {
  programId: string;
}

type GetProgramOutputType = ProgramType;

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
        url: `/fsm/program/`,
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
      invalidatesTags: ['program', 'programs'],
      query: ({ programId, ...body }) => ({
        url: `/fsm/program/${programId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateProgramOutputType => {
        return response;
      },
    }),

    getPrograms: builder.query<GetProgramsOutputType, GetProgramsInputType>({
      providesTags: ['programs'],
      query: ({ websiteName, pageNumber = 1, isPrivate }) => `fsm/program/?website=${websiteName}&page=${pageNumber}${isPrivate != null ? `&is_private=${isPrivate}` : ''}`,
      transformResponse: (respons: any): GetProgramsOutputType => {
        return {
          programs: respons.results,
          count: respons.count,
        };
      },
    }),

    getProgram: builder.query<GetProgramOutputType, GetProgramInputType>({
      providesTags: ['program'],
      query: ({ programId }) => `fsm/program/${programId}/`,
      transformResponse: (respons: any): GetProgramOutputType => {
        return respons;
      },
    }),

    softDeleteProgram: builder.mutation<any, { programId: string }>({
      invalidatesTags: ['programs'],
      query: ({ programId }) => `fsm/program/${programId}/soft_remove_program/`
    }),
  })
});

export const {
  useGetProgramQuery,
  useGetProgramsQuery,
  useUpdateProgramMutation,
  useCreateProgramMutation,
  useSoftDeleteProgramMutation,
} = ProgramSlice;
