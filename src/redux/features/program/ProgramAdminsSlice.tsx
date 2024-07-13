import { UserMinimalType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type ProgramInputType = {
  programId: string;
}

type GetProgramAdminsOutputType = UserMinimalType[];

type AddAdmintToProgramInputType = {
  programId: string;
  username: string;
};

type AddAdmintToProgramOutputType = {

}

type RemoveAdmintFromProgramInputType = {
  programId: string;
  username: string;
};

type RemoveAdmintFromProgramOutputType = {

}

export const ProgramAdminsSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getProgramAdmins: builder.query<GetProgramAdminsOutputType, ProgramInputType>({
      providesTags: ['program-admins'],
      query: ({ programId }) => `fsm/program/${programId}/get_admins/`,
      transformResponse: (respons: any): GetProgramAdminsOutputType => {
        return respons;
      },
    }),

    addAdminToProgram: builder.mutation<AddAdmintToProgramOutputType, AddAdmintToProgramInputType>({
      invalidatesTags: ['program-admins'],
      query: ({ programId, ...body }) => ({
        url: `/fsm/program/${programId}/add_admin/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): AddAdmintToProgramOutputType => {
        return response;
      },
    }),

    removeAdminFromProgram: builder.mutation<RemoveAdmintFromProgramOutputType, RemoveAdmintFromProgramInputType>({
      invalidatesTags: ['program-admins'],
      query: ({ programId, ...body }) => ({
        url: `/fsm/program/${programId}/remove_admin/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: any): AddAdmintToProgramOutputType => {
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
