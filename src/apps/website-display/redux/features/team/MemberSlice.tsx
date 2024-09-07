import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type AddUserToTeamInputType = {
  teamId: string;
  username: string;
}

type AddUserToTeamOutputType = void;

type RemoveUserFromTeamInputType = {
  teamId: string;
  receiptId: string;
}

type RemoveUserFromTeamOutputType = void;

type MakeUserTeamHeadInputType = {
  receiptId: string;
  teamId: string;
}

type MakeUserTeamHeadOutputType = void;

export const MemberSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    addUserToTeam: builder.mutation<AddUserToTeamOutputType, AddUserToTeamInputType>({
      invalidatesTags: (result, error, item) => {
        if (!error) {
          return ([{ type: 'team', id: item.teamId }, 'teams']);
        }
      },
      query: ({ teamId, ...body }) => ({
        url: `fsm/team/${teamId}/add_user_to_team/`,
        method: 'POST',
        body,
      }),
    }),

    removeUserFromTeam: builder.mutation<RemoveUserFromTeamOutputType, RemoveUserFromTeamInputType>({
      invalidatesTags: (result, error, item) => {
        if (!error) {
          return ([{ type: 'team', id: item.teamId }, 'teams']);
        }
      },
      query: ({ receiptId, ...body }) => ({
        url: `/fsm/team/remove_user_from_team/`,
        method: 'POST',
        body: {
          ...body,
          receipt: receiptId,
        },
      }),
    }),

    makeUserTeamHead: builder.mutation<MakeUserTeamHeadOutputType, MakeUserTeamHeadInputType>({
      invalidatesTags: (result, error, item) => {
        if (!error) {
          return ([{ type: 'team', id: item.teamId }, 'teams']);
        }
      },
      query: ({ teamId, receiptId, ...body }) => ({
        url: `fsm/team/${teamId}/make_user_team_head/`,
        method: 'POST',
        body: {
          ...body,
          receipt: receiptId,
        },
      }),
    }),
  })
});

export const {
  useAddUserToTeamMutation,
  useRemoveUserFromTeamMutation,
  useMakeUserTeamHeadMutation,
} = MemberSlice;
