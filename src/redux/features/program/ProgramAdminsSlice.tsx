import { UserPublicInfoType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type ProgramInputType = {
  programId: string;
}

type GetProgramAdminsOutputType = UserPublicInfoType[];

type AddAdminToProgramInputType = {
  programId: string;
  username: string;
};

type AddAdminToProgramOutputType = {

}

type RemoveAdminFromProgramInputType = {
  programId: string;
  username: string;
};

type RemoveAdminFromProgramOutputType = {

}

export const ProgramAdminsSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getProgramAdmins: builder.query<GetProgramAdminsOutputType, ProgramInputType>({
      providesTags: ['program-admins'],
      query: ({ programId }) => `fsm/program/${programId}/get_admins/`,
      transformResponse: (response: any): GetProgramAdminsOutputType => {
        return response;
      },
    }),

    addAdminToProgram: builder.mutation<AddAdminToProgramOutputType, AddAdminToProgramInputType>({
      invalidatesTags: ['program-admins'],
      query: ({ programId, ...body }) => ({
        url: `/fsm/program/${programId}/add_admin/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): AddAdminToProgramOutputType => {
        return response;
      },
    }),

    removeAdminFromProgram: builder.mutation<RemoveAdminFromProgramOutputType, RemoveAdminFromProgramInputType>({
      invalidatesTags: ['program-admins'],
      query: ({ programId, ...body }) => ({
        url: `/fsm/program/${programId}/remove_admin/`,
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
