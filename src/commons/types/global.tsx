import { BannerType } from "./redux/WebSiteAppearance";

export type DashboardTabType = {
  name: string;
  label: string;
  icon: any;
  component: any;
  isActive?: boolean;
}

export type directionType = 'rtl' | 'ltr';

export type AppbarModes =
  'DASHBOARD' |
  'FSM' |
  'MENTOR_FSM' |
  'PROGRAM' |
  'GENERAL' |
  'ARTICLE' |
  'WEBSITE' |
  'None';

export type AppbarItemsType = {
  desktopLeftItems: any[];
  desktopRightItems: any[];
  mobileLeftItems: any[];
  mobileRightItems: any[];
  mobileMenuListItems: any[];
  toolbarItems?: any[];
}

export type RegistrationStepType = {
  name: RegistrationStepNameType;
  label: RegistrationStepLabelType;
  component: any;
  onClick?: any;
  disabled?: boolean;
};

export type RegistrationStepLabelType =
  'تکمیل اطلاعات شخصی' |
  'تکمیل اطلاعات دانش‌آموزی' |
  'تکمیل اطلاعات دانشجویی' |
  'ثبت‌نام در دوره' |
  'وضعیت ثبت‌نام' |
  'پرداخت هزینه' |
  'ورود به دوره'

export type RegistrationStepNameType =
  'user-setting' |
  'school-setting' |
  'university-setting' |
  'form' |
  'status' |
  'payment' |
  'program'

export type WebsiteType = {
  website_type: 'academy';
  name: string;
  display_name: string;
  logo: LogoType;
  appbar: { body: BackendAppbarType };
  header: HeaderMetaData;
  og_metadata: OpenGraphMetaData;
  has_login_with_google: boolean;
}

export type PartyType = {
  party_type: 'individual' | 'company';
  uuid: string;
  name: string;
  display_name: string;
  logo: LogoType;
}

export type PageMetadataType = {
  address_pattern: string;
  header_data: HeaderMetaData;
  og_metadata: OpenGraphMetaData;
  banners: BannerType[];
  appbar: { body: BackendAppbarType };
}

export type BackendAppbarType = {
  desktopLeftItems: AppbarMenuItemType[];
  desktopRightItems: AppbarMenuItemType[];
}

export type LogoType = {
  desktop_image: string;
  mobile_image: string;
}

export type HeaderMetaData = {
  title: string;
  description: string;
  theme_color: string;
  icon: string;
}

export type OpenGraphMetaData = {
  title: string;
  description: string;
  type: string;
  image: string;
  url: string;
}

export type AppbarMenuItemType = {
  to: string;
  label: string;
  items: AppbarMenuItemType[];
  position: 'right' | 'left';
}


export type HintType = any;