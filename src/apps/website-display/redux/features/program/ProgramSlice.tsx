import { FSMUserPermissions, ProgramType, ProgramUserPermissions } from 'commons/types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetProgramsInputType = {
  pageNumber?: number;
}

type GetProgramsOutputType = {
  programs: ProgramType[];
  count: number;
}

type GetProgramInputType = {
  programSlug: string;
}

type GetProgramOutputType = ProgramType;

type GetProgramUserPermissionsInputType = {
  programSlug: string;
}

type GetProgramUserPermissionsOutputType = ProgramUserPermissions;

type GetProgramFSMsUserPermissionsInputType = {
  programSlug: string;
}

type GetProgramFSMsUserPermissionsOutputType = FSMUserPermissions[];

type UpdateProgramInputType = {
  programSlug: string;
  body: any;
};

type UpdateProgramOutputType = {

}

type CreateProgramInputType = {
  body: any;
};

type CreateProgramOutputType = {

}

export const ProgramSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    createProgram: builder.mutation<CreateProgramOutputType, CreateProgramInputType>({
      invalidatesTags: ['programs'],
      query: (body) => ({
        url: `/fsm/program/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): UpdateProgramOutputType => {
        return response;
      },
    }),

    updateProgram: builder.mutation<UpdateProgramOutputType, UpdateProgramInputType>({
      invalidatesTags: ['program', 'programs'],
      query: ({ programSlug, ...body }) => ({
        url: `/fsm/program/${programSlug}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateProgramOutputType => {
        return response;
      },
    }),

    getPrograms: builder.query<GetProgramsOutputType, GetProgramsInputType>({
      providesTags: ['programs'],
      query: ({ pageNumber = 1 }) => `fsm/program/?page=${pageNumber}`,
      transformResponse: (response: any): GetProgramsOutputType => {
        return {
          programs: response.results,
          count: response.count,
        };
      },
    }),

    getProgram: builder.query<GetProgramOutputType, GetProgramInputType>({
      providesTags: ['program'],
      query: ({ programSlug }) => `fsm/program/${programSlug}/`,
      transformResponse: (response: any): GetProgramOutputType => {
        return response;
      },
    }),

    getProgramUserPermissions: builder.query<GetProgramUserPermissionsOutputType, GetProgramUserPermissionsInputType>({
      providesTags: ['program-user-permissions'],
      query: ({ programSlug }) => `fsm/program/${programSlug}/get_user_permissions/`,
      transformResponse: (response: any): GetProgramUserPermissionsOutputType => {
        return response;
      },
    }),

    getProgramFSMsUserPermissions: builder.query<GetProgramFSMsUserPermissionsOutputType, GetProgramFSMsUserPermissionsInputType>({
      providesTags: ['fsms-user-permissions'],
      query: ({ programSlug }) => `fsm/program/${programSlug}/get_fsms_user_permissions/`,
      transformResponse: (response: any): GetProgramFSMsUserPermissionsOutputType => {
        return response;
      },
    }),

    softDeleteProgram: builder.mutation<any, { programSlug: string }>({
      invalidatesTags: ['programs'],
      query: ({ programSlug }) => `fsm/program/${programSlug}/soft_delete/`
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
  useGetProgramUserPermissionsQuery,
  useGetProgramFSMsUserPermissionsQuery,
} = ProgramSlice;
