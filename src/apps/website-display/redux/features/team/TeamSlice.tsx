import { TeamType } from 'commons/types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';


type GetProgramTeamsInputType = {
  programSlug: string;
}

type GetProgramTeamsOutputType = TeamType[];

type GetTeamInputType = {
  teamId: string;
}

type GetTeamOutputType = TeamType;

type CreateTeamInputType = {
  programSlug: string;
} & Partial<TeamType>;

type CreateTeamOutputType = void;

type CreateAndJoinTeamInputType = {
  programSlug: string;
} & Partial<TeamType>;

type CreateAndJoinTeamOutputType = void;

type UpdateTeamInputType = {
  teamId: string;
} & Partial<TeamType>;

type UpdateTeamOutputType = void;

type DeleteTeamInputType = {
  teamId: string;
}

type DeleteTeamOutputType = void;

export const TeamSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getTeam: builder.query<GetTeamOutputType, GetTeamInputType>({
      providesTags: (result, error, item) => [{ type: 'team', id: item.teamId }],
      query: ({ teamId }) => `fsm/team/${teamId}/`,
      transformResponse: (response: any): GetTeamOutputType => {
        return response;
      },
    }),

    getProgramTeams: builder.query<GetProgramTeamsOutputType, GetProgramTeamsInputType>({
      providesTags: ['teams'],
      query: ({ programSlug }) => `fsm/team/?program=${programSlug}`,
      transformResponse: (response: any): GetProgramTeamsOutputType => {
        return response;
      },
    }),

    createTeam: builder.mutation<CreateTeamOutputType, CreateTeamInputType>({
      invalidatesTags: ['teams'],
      query: ({ programSlug, ...body }) => ({
        url: `fsm/team/`,
        method: 'POST',
        body: {
          program: programSlug,
          ...body,
        }
      }),
    }),

    createAndJoinTeam: builder.mutation<CreateAndJoinTeamOutputType, CreateAndJoinTeamInputType>({
      invalidatesTags: ['teams', 'receipt'],
      query: ({ programSlug, ...body }) => ({
        url: `fsm/team/create_and_join_team/`,
        method: 'POST',
        body: {
          program: programSlug,
          ...body
        },
      }),
    }),

    updateTeam: builder.mutation<UpdateTeamOutputType, UpdateTeamInputType>({
      invalidatesTags: (result, error, item) => {
        if (!error) {
          return ([{ type: 'team', id: item.teamId }, 'teams']);
        }
      },
      query: ({ teamId, ...body }) => ({
        url: `fsm/team/${teamId}/`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteTeam: builder.mutation<DeleteTeamOutputType, DeleteTeamInputType>({
      invalidatesTags: ['teams', 'receipt'],
      query: ({ teamId }) => ({
        url: `fsm/team/${teamId}/`,
        method: 'DELETE',
      }),
    }),
  })
});

export const {
  useCreateTeamMutation,
  useCreateAndJoinTeamMutation,
  useGetTeamQuery,
  useGetProgramTeamsQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = TeamSlice;
