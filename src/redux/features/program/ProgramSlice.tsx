import { ProgramType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetProgramsInputType = {
  websiteName: string | undefined;
  pageNumber?: number;
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

type GetProgramPermissionInputType = {
  programId: string;
}

type GetProgramPermissionOutputType = any;

type GetProgramsPermissionsInputType = {
  websiteName: string;
  pageNumber: number;
}

type GetProgramsPermissionsOutputType = any;

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
      query: ({ websiteName, pageNumber = 1 }) => `fsm/program/?website=${websiteName}&page=${pageNumber}`,
      transformResponse: (response: any): GetProgramsOutputType => {
        return {
          programs: response.results,
          count: response.count,
        };
      },
    }),

    getProgram: builder.query<GetProgramOutputType, GetProgramInputType>({
      providesTags: ['program'],
      query: ({ programId }) => `fsm/program/${programId}/`,
      transformResponse: (response: any): GetProgramOutputType => {
        return response;
      },
    }),

    softDeleteProgram: builder.mutation<any, { programId: string }>({
      invalidatesTags: ['programs'],
      query: ({ programId }) => `fsm/program/${programId}/soft_delete/`
    }),

    registerUserInProgram: builder.mutation<any, { registrationFormId: string, username: string }>({
      invalidatesTags: ['receipts'],
      query: ({ registrationFormId, username }) => ({
        url: `fsm/registration_form_admin/${registrationFormId}/register_user_in_program/`,
        method: 'POST',
        body: {
          username,
        },
      }),
    }),
  })
});

export const {
  useGetProgramQuery,
  useGetProgramsQuery,
  useUpdateProgramMutation,
  useCreateProgramMutation,
  useSoftDeleteProgramMutation,
  useRegisterUserInProgramMutation,
} = ProgramSlice;
