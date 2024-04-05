type StudentshipType = 'Academic' | 'School';

export type UserInfoType = {
  academic_studentship: AcademicStudentshipType;
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
  school_studentship: SchoolStudentshipType;
  userPermissions: UserPermissions[];
  username: string;
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
  id: number;
  is_document_verified: boolean;
  major: string;
  school: number;
  studentship_type: StudentshipType;
};