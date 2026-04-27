export interface CreateCandidateDTO {
  full_name: string;
  email: string;
  phone?: string;
  years_of_experience?: number;
  primary_skill?: string;
}