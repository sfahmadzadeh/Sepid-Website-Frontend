import { WebsiteType, PageMetadataType } from 'types/global';
import { ManageWebsiteServiceApi } from './ManageWebsiteServiceApiSlice'

type GetWebsiteInputDataType = {
  is_authenticated?: boolean;
}

export const WebsiteSlice = ManageWebsiteServiceApi.injectEndpoints({
  endpoints: builder => ({
    getWebsite: builder.query<WebsiteType, GetWebsiteInputDataType | void>({
      query: () => `website/get-website/`,
    }),
    getPageMetadata: builder.query<PageMetadataType, { websiteName: string, pageAddress: string }>({
      query: ({ websiteName, pageAddress }) => `appearance/get-page-metadata/?website=${websiteName}&page_address=${pageAddress}`,
    })
  })
})

export const {
  useGetWebsiteQuery,
  useGetPageMetadataQuery,
} = WebsiteSlice;
