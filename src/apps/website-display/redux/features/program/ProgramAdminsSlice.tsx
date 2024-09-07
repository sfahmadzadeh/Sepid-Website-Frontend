import { UserPublicInfoType } from 'commons/types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type ProgramInputType = {
  programSlug: string;
}

type GetProgramAdminsOutputType = UserPublicInfoType[];

type AddAdminToProgramInputType = {
  programSlug: string;
  username: string;
};

type AddAdminToProgramOutputType = {

}

type RemoveAdminFromProgramInputType = {
  programSlug: string;
  username: string;
};

type RemoveAdminFromProgramOutputType = {

}

export const ProgramAdminsSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getProgramAdmins: builder.query<GetProgramAdminsOutputType, ProgramInputType>({
      providesTags: ['program-admins'],
      query: ({ programSlug }) => `fsm/program/${programSlug}/get_admins/`,
      transformResponse: (response: any): GetProgramAdminsOutputType => {
        return response;
      },
    }),

    addAdminToProgram: builder.mutation<AddAdminToProgramOutputType, AddAdminToProgramInputType>({
      invalidatesTags: ['program-admins'],
      query: ({ programSlug, ...body }) => ({
        url: `/fsm/program/${programSlug}/add_admin/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): AddAdminToProgramOutputType => {
        return response;
      },
    }),

    removeAdminFromProgram: builder.mutation<RemoveAdminFromProgramOutputType, RemoveAdminFromProgramInputType>({
      invalidatesTags: ['program-admins'],
      query: ({ programSlug, ...body }) => ({
        url: `/fsm/program/${programSlug}/remove_admin/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): AddAdminToProgramOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetProgramAdminsQuery,
  useAddAdminToProgramMutation,
  useRemoveAdminFromProgramMutation,
} = ProgramAdminsSlice;
