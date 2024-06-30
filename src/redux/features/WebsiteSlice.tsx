import { WebsiteType, PageMetadataType } from 'types/global';
import { ManageWebsiteServiceApi } from './ManageWebsiteServiceApiSlice'

type WebsitePermissionsType = {
  isAdmin: boolean;
}

export const WebsiteSlice = ManageWebsiteServiceApi.injectEndpoints({
  endpoints: builder => ({
    getWebsite: builder.query<WebsiteType, void>({
      query: () => `website/get-website/`,
    }),
    getPermission: builder.query<WebsitePermissionsType, { websiteName: string }>({
      query: ({ websiteName }) => `website/permissions/?website=${websiteName}`,
      transformResponse: (response: any): WebsitePermissionsType => {
        return {
          isAdmin: response.is_admin,
        };
      },
    }),
    getPageMetadata: builder.query<PageMetadataType, { websiteName: string, pageAddress: string }>({
      query: ({ websiteName, pageAddress }) => `appearance/get-page-metadata/?website=${websiteName}&page_address=${pageAddress}`,
    })
  })
})

export const {
  useGetWebsiteQuery,
  useGetPermissionQuery,
  useGetPageMetadataQuery,
} = WebsiteSlice;
