import { FSMType, ProgramType } from 'types/models';
import { ManageContentServiceApi } from './ManageContentServiceApiSlice';
import { ArticleType } from 'types/redux/article';

type UpdateFSMInputType = {
  fsmId: string;
} & FSMType;

type UpdateFSMOutputType = {

}

export const FSMSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    updateFSM: builder.mutation<UpdateFSMOutputType, UpdateFSMInputType>({
      query: ({ fsmId, ...body }) => ({
        url: `/fsm/fsm/${fsmId}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: any): UpdateFSMOutputType => {
        return response;
      },
    }),
  })
});

export const { useUpdateFSMMutation } = FSMSlice;
