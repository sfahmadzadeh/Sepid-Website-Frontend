import { SchoolStudentshipType, UserInfoType } from "./profile";

export type InstituteType = any;

type AudienceTypeType = "All" | "Student" | "Academic";
type ProgramTypeType = "Team" | "Individual";

export type ProgramContactInfoType = {
  phone_number: string;
  eitaa_link: string;
  bale_link: string;
  instagram_link: string;
  shad_link: string;
  telegram_link: string;
}

export type ProgramType = {
  is_free: boolean;
  site_help_paper_id: number;
  FAQs_paper_id: number;
  is_manager: boolean;
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
  program_type: ProgramTypeType;
  has_certificate: boolean
  holder: number;
  id: number;
  is_active: boolean;
  is_approved: boolean;
  is_user_participating: boolean;
  maximum_participant: number | null;
  merchandise: Merchandise | null;
  name: string;
  participants_count: number;
  registration_form: string;
  registration_since: string | null;
  registration_till: string | null;
  start_date: string | null;
  team_size: number;
}

export type AnswerSheetType = 'RegistrationReceipt' | 'StateAnswerSheet';

export type Invitation = any
export type CertificateType = any;
export type TeamType = {
  chat_room: string;
  id: string;
  members: RegistrationReceiptType[]
  name: string;
  registration_form: number;
  team_head: number;
};
export type AnswerType = any;

export type RegistrationReceiptType = {
  profile_picture: string;
  id: number;
  is_paid: boolean;
  user: UserInfoType;
  school_studentship: SchoolStudentshipType;
  is_participating: boolean;
  answer_sheet_type: AnswerSheetType;
  certificate: CertificateType;
  team: TeamType;
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
  'StudentshipDataIncomplete';
}

export type Widget = any
export type Request = any

type PaperType = 'RegistrationForm';
type AcceptingStatus = 'AutoAccept' | 'Manual';
type AudienceType = 'Student' | 'Academic' | 'All';
type FSMLearningType = 'Supervised' | 'Unsupervised';
type FSMPType = 'Individual' | 'Team' | 'Hybrid';

export type FSMType = {
  players_count: number;
  is_mentor: boolean;
  id: number;
  name: string;
  first_state: FSMStateType;
  description: string;
  fsm_learning_type: FSMLearningType | '';
  fsm_p_type: FSMPType | '';
  program: string;
  cover_page: string;
  lock: string;
  is_active: boolean;
  is_visible: boolean;
  order_in_program: number;
};

export type RegistrationFormType = {
  accepting_status: AcceptingStatus;
  audience_type: AudienceType;
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
  paper_type: PaperType;
  since: string;
  till: string;
  widgets: Widget;
}
export type Merchandise = any
export type Article = any
export type Problem = any
export type Submission = any
export type SubmissionIsLoading = boolean
export type FSMStateType = any;
export type FSMEdgeType = any;
export type Answer = any
export type WorkshopEdge = any
export type Player = any
export type Token = any
export type UserMinimalType = {
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
