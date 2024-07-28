import { FSMStateType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetFSMStateOutputType = FSMStateType;

export const PaperSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getPaper: builder.query<GetFSMStateOutputType, { paperId: string }>({
      providesTags: (result) => [{ type: 'paper', id: result?.id }],
      query: ({ paperId }) => `fsm/paper/${paperId}/`,
      transformResponse: (response: any): GetFSMStateOutputType => {
        return response;
      },
    }),
  })
});

export const {
  useGetPaperQuery,
} = PaperSlice;
