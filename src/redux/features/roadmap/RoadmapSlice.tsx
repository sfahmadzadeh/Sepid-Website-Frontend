import { Link } from 'types/redux/Roadmap';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetPlayerTransitedPathInputType = {
  playerId: string;
};

type GetPlayerTransitedPathOutputType = Link[];

type GetFSMRoadmapInputType = {
  fsmId: string;
};

type GetFSMRoadmapOutputType = {
  firstStateName: string;
  links: Link[];
}

export const ProgramSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({

    getPlayerTransitedPath: builder.query<GetPlayerTransitedPathOutputType, GetPlayerTransitedPathInputType>({
      providesTags: ['player-transited-path'],
      query: ({ playerId }) => `/roadmap/get_player_transited_path/?player=${playerId}`,
      transformResponse: (response: any): GetPlayerTransitedPathOutputType => {
        return response;
      },
    }),

    getFSMRoadmapAction: builder.query<GetFSMRoadmapOutputType, GetFSMRoadmapInputType>({
      providesTags: ['fsm-states', 'fsm-edges'],
      query: ({ fsmId }) => `/roadmap/get_fsm_roadmap/?fsm=${fsmId}`,
      transformResponse: (response: any): GetFSMRoadmapOutputType => {
        return {
          firstStateName: response.first_state_name,
          links: response.links,
        };
      },
    }),

  })
});

export const {
  useGetFSMRoadmapActionQuery,
  useGetPlayerTransitedPathQuery
} = ProgramSlice;
