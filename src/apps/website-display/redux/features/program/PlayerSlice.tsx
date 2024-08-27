import { FSMStateType, PlayerType, UserPublicInfoType } from 'commons/types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GoForwardInputType = {
  edgeId: string;
  password?: string;
}

type GoForwardOutputType = void;

type GoBackwardInputType = {
  playerId: string;
}

type GoBackwardOutputType = void;

type MentorMoveForwardInputType = {
  edgeId: string;
}

type MentorMoveForwardOutputType = void;

type MentorMoveBackwardInputType = {
  playerId: string;
}

type MentorMoveBackwardOutputType = void;

type GetPlayerInputType = {
  playerId: string;
}

type GetPlayerOutputType = PlayerType;

type EnterFSMInputType = {
  fsmId: string;
  password?: string;
}

type EnterFSMOutputType = PlayerType;

type GetCurrentUserFSMPlayerInputType = {
  fsmId: string;
}

type GetCurrentUserFSMPlayerOutputType = PlayerType;

export const PlayerSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    goForward: builder.mutation<GoForwardOutputType, GoForwardInputType>({
      invalidatesTags: ['player'],
      query: ({ edgeId, password }) => ({
        url: `/fsm/edge/${edgeId}/transit_player_on_edge/`,
        method: 'POST',
        body: {
          password,
        },
      }),
    }),

    goBackward: builder.mutation<GoBackwardOutputType, GoBackwardInputType>({
      invalidatesTags: ['player'],
      query: ({ playerId }) => ({
        url: `/fsm/player/${playerId}/go_backward/`,
        method: 'POST',
      }),
    }),

    mentorMoveForward: builder.mutation<MentorMoveForwardOutputType, MentorMoveForwardInputType>({
      invalidatesTags: ['player'],
      query: ({ edgeId }) => ({
        url: `/fsm/edge/${edgeId}/mentor_move_forward/`,
        method: 'POST',
      }),
    }),

    mentorMoveBackward: builder.mutation<MentorMoveBackwardOutputType, MentorMoveBackwardInputType>({
      invalidatesTags: ['player'],
      query: ({ playerId }) => ({
        url: `/fsm/player/${playerId}/mentor_move_backward/`,
        method: 'POST',
      }),
    }),

    getPlayer: builder.query<GetPlayerOutputType, GetPlayerInputType>({
      providesTags: ['player'],
      query: ({ playerId }) => ({
        url: `/fsm/player/${playerId}/`,
      }),
    }),

    getCurrentUserFSMPlayer: builder.query<GetCurrentUserFSMPlayerOutputType, GetCurrentUserFSMPlayerInputType>({
      providesTags: ['player'],
      query: ({ fsmId }) => ({
        url: `/fsm/fsm/${fsmId}/current_user_fsm_player/`,
        method: 'GET',
      }),
    }),

    enterFSM: builder.mutation<EnterFSMOutputType, EnterFSMInputType>({
      invalidatesTags: ['player'],
      query: ({ fsmId, password }) => ({
        url: `/fsm/fsm/${fsmId}/enter_fsm/`,
        method: 'POST',
        body: {
          password,
        }
      }),
    }),
  })
});

export const {
  useGoForwardMutation,
  useGoBackwardMutation,
  useMentorMoveForwardMutation,
  useMentorMoveBackwardMutation,
  useGetPlayerQuery,
  useGetCurrentUserFSMPlayerQuery,
  useEnterFSMMutation,
} = PlayerSlice;
