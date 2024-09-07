import { WebsiteType, PageMetadataType } from 'commons/types/global';
import { ManageWebsiteServiceApi } from './ManageWebsiteServiceApiSlice'

type WebsitePermissionsType = {
  isAdmin: boolean;
}

export const WebsiteSlice = ManageWebsiteServiceApi.injectEndpoints({
  endpoints: builder => ({
    getWebsite: builder.query<WebsiteType, void>({
      query: () => `website/get-website/`,
    }),
    getPermission: builder.query<WebsitePermissionsType, void>({
      query: () => `website/permissions/`,
      transformResponse: (response: any): WebsitePermissionsType => {
        return {
          isAdmin: response.is_admin,
        };
      },
    }),
    getPageMetadata: builder.query<PageMetadataType, { pageAddress: string }>({
      query: ({ pageAddress }) => `appearance/get-page-metadata/?page_address=${pageAddress}`,
    })
  })
})

export const {
  useGetWebsiteQuery,
  useGetPermissionQuery,
  useGetPageMetadataQuery,
} = WebsiteSlice;
