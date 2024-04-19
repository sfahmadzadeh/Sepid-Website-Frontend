type AudienceTypeType = "All" | "Student" | "Academic";
type EventTypeType = "Team" | "Individual";

export type Workshop = any

export type ProgramType = {
  accessible_after_closure: boolean;
  audience_type: AudienceTypeType;
  certificates_ready: boolean
  cover_page: string;
  creator: string;
  description: string;
  end_date: string | null;
  event_type: EventTypeType;
  has_certificate: boolean
  holder: number;
  id: number;
  is_active: boolean;
  is_approved: boolean;
  is_paid: boolean;
  is_user_participating: boolean;
  maximum_participant: number | null;
  merchandise: Merchandise | null;
  name: string;
  participants_count: number;
  registration_form: number;
  registration_receipt: string | null;
  registration_since: string | null;
  registration_till: string | null;
  start_date: string | null;
  team_size: number;
  user_registration_status:
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

export type Invitation = any
export type RegistrationReceipt = any
export type Widget = any
export type Team = any
export type Request = any

type PaperType = 'RegistrationForm';
type AcceptingStatus = 'AutoAccept' | 'Manual';
type AudienceType = 'Student' | 'Academic' | 'All';
type FSMLearningType = 'Supervised' | 'Unsupervised';
type FSMPType = 'Individual' | 'Team' | 'Hybrid';

export type FSMType = {
  id: number;
  name: string;
  description: string;
  fsm_learning_type: FSMLearningType | '';
  fsm_p_type: FSMPType | '';
  event: string;
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
  event: number;
  fsm: FSMType;
  has_certificate: boolean;
  id: number;
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
export type State = any
export type Answer = any
export type WorkshopEdge = any
export type Player = any
export type Token = any
export type Mentor = { id: string, first_name: string, last_name: string, email: string, phone_number: string, profilePicturePath?: string }
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
