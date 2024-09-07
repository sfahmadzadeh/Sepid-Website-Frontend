import { InvitationType } from 'commons/types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetTeamInvitationsInputType = {
  teamId: string;
}

type GetTeamInvitationsOutputType = InvitationType[];

type GetMyInvitationsInputType = {
  registrationFormId: string;
}

type GetMyInvitationsOutputType = InvitationType[];

type InviteMemberInputType = {
  username: string;
  teamId: string;
}

type InviteMemberOutputType = void;

type DeleteInvitationInputType = {
  invitationId: string;
}

type DeleteInvitationOutputType = void;

type RespondInvitationInputType = {
  invitationId: string;
  status: 'Accepted' | 'Rejected' | 'Waiting';
}

type RespondInvitationOutputType = void;


export const InvitationSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getTeamInvitations: builder.query<GetTeamInvitationsOutputType, GetTeamInvitationsInputType>({
      providesTags: ['team-invitations'],
      query: ({ teamId }) => `fsm/team/${teamId}/get_team_invitations/`,
      transformResponse: (response: any): GetTeamInvitationsOutputType => {
        return response;
      },
    }),

    getMyInvitations: builder.query<GetMyInvitationsOutputType, GetMyInvitationsInputType>({
      providesTags: ['my-invitations'],
      query: ({ registrationFormId }) => `fsm/form/${registrationFormId}/my_invitations/`,
      transformResponse: (response: any): GetMyInvitationsOutputType => {
        return response;
      },
    }),

    inviteMember: builder.mutation<InviteMemberOutputType, InviteMemberInputType>({
      invalidatesTags: ['team-invitations', 'my-invitations'],
      query: ({ teamId, ...body }) => ({
        url: `fsm/team/${teamId}/invite_member/`,
        method: 'POST',
        body,
      }),
    }),

    deleteInvitation: builder.mutation<DeleteInvitationOutputType, DeleteInvitationInputType>({
      invalidatesTags: ['team-invitations', 'my-invitations'],
      query: ({ invitationId }) => ({
        url: `fsm/invitations/${invitationId}/`,
        method: 'DELETE',
      }),
    }),

    respondInvitation: builder.mutation<RespondInvitationOutputType, RespondInvitationInputType>({
      invalidatesTags: ['team-invitations', 'my-invitations', 'receipt'],
      query: ({ invitationId, ...body }) => ({
        url: `fsm/invitations/${invitationId}/respond/`,
        method: 'POST',
        body,
      }),
    }),
  })
});

export const {
  useGetMyInvitationsQuery,
  useGetTeamInvitationsQuery,
  useInviteMemberMutation,
  useDeleteInvitationMutation,
  useRespondInvitationMutation,
} = InvitationSlice;
