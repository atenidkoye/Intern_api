import { Request, Response } from "express";

import {
  createCandidateService,
  getCandidatesService,
  getCandidateByIdService,
  updateCandidateService,
  deleteCandidateService,
} from "./candidate.service";

import { CreateCandidate } from "./candidate.types";

//Create CANDIDATE

export const createCandidate = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const data: CreateCandidate = req.body;

    const result = await createCandidateService(data);

    res.status(201).json({
      success: true,
      data: result,
    });

  } catch (err: any) {

    if (err.code === "23505") {

      res.status(400).json({
        success: false,
        error: "Email must be unique",
      });

      return;
    }

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// GET ALL CANDIDATES

export const getCandidates = async (
  _: Request,
  res: Response
): Promise<void> => {

  try {

    const result = await getCandidatesService();

    res.json({
      success: true,
      data: result,
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// GET CANDIDATE BY ID

export const getCandidateById = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    const candidate =
      await getCandidateByIdService(id);

    if (!candidate) {

      res.status(404).json({
        success: false,
        error: "Candidate not found",
      });

      return;
    }

    res.json({
      success: true,
      data: candidate,
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Update CANDIDATE

export const updateCandidate = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    const data: CreateCandidate = req.body;

    const updated =
      await updateCandidateService(id, data);

    res.json({
      success: true,
      data: updated,
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete CANDIDATE

export const deleteCandidate = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const id = Number(req.params.id);

    await deleteCandidateService(id);

    res.json({
      success: true,
      message: "Candidate deleted",
    });

  } catch (err: any) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};