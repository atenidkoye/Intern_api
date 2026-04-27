import { Request, Response } from "express";
import {
  createCandidateService,
  getCandidatesService,
} from "../services/candidate.service";
import { CreateCandidateDTO } from "../types/candidate.types";

export const createCandidate = async (req: Request, res: Response) => {
  try {
    const data: CreateCandidateDTO = req.body;

    const result = await createCandidateService(data);
    res.status(201).json(result);
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(400).json({ error: "Email must be unique" });
    }
    res.status(500).json({ error: err.message });
  }
};

export const getCandidates = async (_: Request, res: Response) => {
  try {
    const result = await getCandidatesService();
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};