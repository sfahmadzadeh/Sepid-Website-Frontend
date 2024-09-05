import { HintType } from "./global";
import { SchoolStudentshipType, UserInfoType } from "./profile";
import { WidgetType } from "./widgets/widget";

export type PlayerRequestType = any;

export type FileType = {
  id: string;
  file: string;
};

export type ProgramContactInfoType = {
  phone_number: string;
  eitaa_link: string;
  bale_link: string;
  instagram_link: string;
  shad_link: string;
  telegram_link: string;
}

type AudienceTypeType = "All" | "Student" | "Academic";
type ProgramParticipationType = "Team" | "Individual";
type ProgramTypeType = 'Campaign' | 'Event' | 'Class' | 'Course' | 'Game';

export type ProgramType = {
  type: ProgramTypeType;
  slug: string;
  is_free: boolean;
  site_help_paper_id: number;
  FAQs_paper_id: number;
  show_scores: boolean;
  program_contact_info: ProgramContactInfoType;
  is_visible: boolean;
  accessible_after_closure: boolean;
  audience_type: AudienceTypeType;
  certificates_ready: boolean
  cover_page: string;
  creator: string;
  description: string;
  end_date: string | null;
  participation_type: ProgramParticipationType;
  has_certificate: boolean
  id: string;
  is_active: boolean;
  is_approved: boolean;
  is_user_participating: boolean;
  maximum_participant: number | null;
  name: string;
  initial_participants_count: number;
  final_participants_count: number;
  registration_form: string;
  registration_since: string | null;
  registration_till: string | null;
  start_date: string | null;
  team_size: number;
}

export type AnswerSheetType = 'RegistrationReceipt' | 'StateAnswerSheet';

export type InvitationType = any
export type CertificateType = any;
export type TeamType = {
  chat_room: string;
  id: string;
  members: RegistrationReceiptType[]
  name: string;
  registration_form: number;
  team_head: string;
};
export type AnswerType = any;

export type RegistrationReceiptType = {
  form: string
  profile_picture: string;
  id: string;
  is_paid: boolean;
  user: UserInfoType;
  school_studentship: SchoolStudentshipType;
  is_participating: boolean;
  answer_sheet_type: AnswerSheetType;
  certificate: CertificateType;
  team: TeamType | string;
  answers: AnswerType[];
  status:
  'Waiting' |
  'Rejected' |
  'Accepted' |
  'DeadlineMissed' |
  'NotPermitted' |
  'NotRegistered' |
  'NotStarted' |
  'GradeNotAvailable' |
  'GradeNotSuitable' |
  'StudentshipDataIncomplete';
}

type StateTemplateTypes = 'normal' | 'board';
type PaperTypes = 'RegistrationForm';
type AcceptingStatusTypes = 'AutoAccept' | 'Manual';
type AudienceTypes = 'Student' | 'Academic' | 'All';
type FSMLearningTypes = 'Supervised' | 'Unsupervised';
type FSMPTypes = 'Individual' | 'Team' | 'Hybrid';

type a = FSMStateType;

export type ContentType = {
  has_entrance_lock?: boolean;
}

export type FSMType = ContentType & {
  players_count: number;
  is_mentor: boolean;
  id: string;
  name: string;
  first_state: FSMStateType;
  description: string;
  fsm_learning_type: FSMLearningTypes | '';
  fsm_p_type: FSMPTypes | '';
  program: string;
  cover_page: string;
  is_active: boolean;
  is_visible: boolean;
  order_in_program: number;
};

type GenderPartitionType = 'OnlyMale' | 'OnlyFemale' | 'BothPartitioned' | 'BothNonPartitioned';

export type RegistrationFormType = {
  accepting_status: AcceptingStatusTypes;
  gender_partition_status: GenderPartitionType;
  audience_type: AudienceTypes;
  certificate_templates: any;
  certificates_ready: boolean;
  conditions: any;
  creator: string;
  duration: string;
  program: number;
  fsm: FSMType;
  has_certificate: boolean;
  id: string;
  is_exam: boolean;
  max_grade: number;
  min_grade: number;
  paper_type: PaperTypes;
  since: string;
  till: string;
  widgets: WidgetType[];
}
export type Article = any
export type Problem = any
export type Submission = any
export type SubmissionIsLoading = boolean
export type PaperType = {
  id: string;
  widgets: WidgetType[]
  hints: HintType[];
}
export type FSMStateType = PaperType & {
  name: string;
  fsm: string;
  inward_edges: EdgeType[];
  outward_edges: EdgeType[];
  template: StateTemplateTypes;
};
export type FSMEdgeType = any;
export type Answer = any
export type WorkshopEdge = any
export type Token = any
export type UserPublicInfoType = {
  username: string;
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profilePicturePath?: string;
}
export type UploadedFile = { link: string, name: string, id: string }

export type LogoType = {
  mobile_image: string;
  desctop_image: string;
}

export type PartyType = {
  displayName: string;
  logo: LogoType;
};

export type MessageType = {
  id: number;
  reply_to?: MessageType;
  sender: PartyType;
  recipient: PartyType;
  title: string;
  content: string; // todo: change content to Widget
  seen: boolean;
  received_datetime: any;
}

export type InstituteType = {
  id: string;
  name: string;
  institute_type: 'School' | 'University' | 'Other';
  address?: string;
  province?: string;
  city?: string;
  postal_code?: number;
  phone_number?: string;
  contact_info?: string;
  description?: string;
  created_at?: string;
  is_approved?: boolean;
  owner?: string;
  creator?: string;
  admins?: string[];
}

export type SchoolType = InstituteType & {
  school_type: 'Elementary' | 'JuniorHigh' | 'High' | 'SchoolOfArt';
  gender_type: 'Male' | 'Female';
  principal_name?: string;
  principal_phone?: string;
}

export type UniversityType = InstituteType & {

}


export type MerchandiseType = {
  id: string;
  name: string;
  price: number;
  discounted_price: number;
  is_active: boolean;
  is_deleted: boolean;
}

export type DiscountCodeType = {
  id: string;
  code: string;
  value: number;
  expiration_date?: string;
  remaining: number;
  user?: UserPublicInfoType;
  merchandises: MerchandiseType[];
  discount_code_limit?: number;
}

export type VoucherType = any;

export type PurchaseType = {
  amount: number;
  authority?: string;
  callback_domain: string;
  created_at: string;
  discount_code: string;
  id: string;
  merchandise: string;
  payment_link: string;
  ref_id?: string;
  status: 'Started' | 'Success' | 'Repetitious' | 'Failed';
  uniq_code: string;
  user: string;
  voucher?: VoucherType;
}

export type PlayerType = {
  user?: string;
  id: string;
  team: TeamType;
  current_state: FSMStateType;
  last_visit?: string;
}

export type EdgeType = {
  tail: any;
  head: any;
  id: string;
  has_transition_lock?: boolean;
  is_visible: boolean;
  is_back_enabled?: boolean;
}

export type CurrencyType = any;


export type Attribute = {

}

export type Cost = Attribute & {

}

export type Reward = Attribute & {

}

export type RequiredBalance = Attribute & {

}

export type ProgramUserPermissions = {
  is_manager: boolean;
}

export type FSMUserPermissions = {
  fsm_id: string;
  is_mentor: boolean;
}