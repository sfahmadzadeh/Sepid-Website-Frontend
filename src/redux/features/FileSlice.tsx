import jsonToFormData from 'utils/jsonToFromDate';
import { ManageContentServiceApi } from './ManageContentServiceApiSlice';

type CreateFileInputType = {
  file: File;
  // todo: add "party" as the folder name
}

type CreateFileOutputType = {
  file: string;
}

export const FileSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    createFile: builder.mutation<CreateFileOutputType, CreateFileInputType>({
      query: (body) => ({
        url: 'file-storage/file/',
        method: 'POST',
        body: jsonToFormData(body),
        formData: true,
      }),
      transformResponse: (response: any): CreateFileOutputType => {
        return response;
      },
    }),
  })
});

export const { useCreateFileMutation } = FileSlice;
