import { BannerType } from "./redux/WebSiteAppearance";

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
  toolbarItems?:any[];
}

export type WidgetTypes =
  'TextWidget' |
  'Image' |
  'Video' |
  'Aparat' |
  'Iframe' |
  'SmallAnswerProblem' |
  'BigAnswerProblem' |
  'MultiChoiceProblem' |
  'UploadFileProblem';

export type RegistrationStepType = {
  name: RegistrationStepNameType;
  label: RegistrationStepLabelType;
  component: any;
  onClick?: any;
};

export type RegistrationStepLabelType =
  'تکمیل مشخصات شخصی' |
  'تکمیل مشخصات دانش‌آموزی' |
  'تکمیل مشخصات دانشجویی' |
  'ثبت‌نام در دوره' |
  'وضعیت ثبت‌نام' |
  'پرداخت هزینه' |
  'ورود به دوره'

export type RegistrationStepNameType =
  'personal-profile' |
  'student-profile' |
  'academic-profile' |
  'form' |
  'status' |
  'payment' |
  'program'

export type WebsiteType = {
  website_type: 'academy';
  name: string;
  is_admin: boolean;
  display_name: string;
  logo: LogoType;
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
  header_data: HeaderData;
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

export type HeaderData = {
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