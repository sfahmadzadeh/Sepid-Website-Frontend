type StudentshipType = 'Academic' | 'School';

export type UserInfoType = {
  address: string | null;
  bio: string | null;
  birth_date: string | null;
  city: string | null;
  country: string | null;
  date_joined: string | null;
  email: string | null;
  first_name: string | null;
  gender: string | null;
  groups: GroupType[];
  id: string;
  is_active: boolean;
  is_staff: boolean;
  is_supervisor: boolean;
  last_login: string | null;
  last_name: string | null;
  national_code: string | null;
  phone_number: string;
  postal_code: string;
  profile_picture: string;
  province: string;
  userPermissions: UserPermissions[];
  username: string;
  school_studentship: SchoolStudentshipType;
}

type GroupType = any;

type UserPermissions = any;

export type AcademicStudentshipType = {
  degree: string;
  document: string;
  start_date: string;
  end_date: string;
  id: string;
  is_document_verified: boolean;
  studentship_type: StudentshipType
  university: number;
  university_major: string;
};

export type SchoolStudentshipType = {
  document: string;
  start_date: string;
  end_date: string;
  grade: number;
  id: string;
  is_document_verified: boolean;
  major: string;
  school: string;
  studentship_type: StudentshipType;
};