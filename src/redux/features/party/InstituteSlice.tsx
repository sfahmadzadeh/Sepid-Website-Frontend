import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { InstituteType } from 'types/models';

type GetInstitutesInputType = {
  city: string;
}

type GetInstitutesOutputType = InstituteType[];

type CreateInstituteInputType = InstituteType;

type CreateInstituteOutputType = InstituteType;

export const ProfileSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getInstitutes: builder.query<GetInstitutesOutputType, GetInstitutesInputType>({
      providesTags: ['institutes'],
      query: ({ city }) => ({
        url: `auth/institutes/?city=${city}`,
        method: 'GET',
      }),
    }),

    createInstitute: builder.mutation<CreateInstituteOutputType, CreateInstituteInputType>({
      invalidatesTags: ['institutes'],
      query: (body) => ({
        url: `auth/institutes/`,
        method: 'POST',
        body,
      }),
    }),

  })
});

export const {
  useGetInstitutesQuery,
  useCreateInstituteMutation,
} = ProfileSlice;
