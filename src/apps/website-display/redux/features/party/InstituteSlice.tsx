import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';
import { InstituteType, SchoolType } from 'commons/types/models';

type GetInstitutesInputType = {
  city: string;
  gender_type: 'Male' | 'Female';
}

type GetInstitutesOutputType = SchoolType[];

type CreateInstituteInputType = InstituteType;

type CreateInstituteOutputType = InstituteType;

export const ProfileSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getSchools: builder.query<GetInstitutesOutputType, GetInstitutesInputType>({
      providesTags: ['institutes', 'schools'],
      query: ({ city, gender_type }) => ({
        url: `auth/schools/?city=${city}&gender_type=${gender_type}`,
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
  useGetSchoolsQuery,
  useCreateInstituteMutation,
} = ProfileSlice;
