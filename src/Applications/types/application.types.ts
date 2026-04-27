export interface CreateApplicationDTO {
  candidate_id: number;
  position: string;
  status: "applied" | "screening" | "interview" | "rejected" | "accepted";
  source?: string;
}