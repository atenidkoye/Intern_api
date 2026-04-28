export interface CreateApplication {
  candidate_id: number;
  position_id: number;
  status: "applied" | "screening" | "interview" | "rejected" | "accepted";
  source?: string;
}