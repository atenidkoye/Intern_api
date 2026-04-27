import { Request, Response } from "express";
import {
  createApplicationService,
  getApplicationsService,
} from "../services/application.service";
import { CreateApplicationDTO } from "../types/application.types";

export const createApplication = async (req: Request, res: Response) => {
  try {
    const data: CreateApplicationDTO = req.body;

    const result = await createApplicationService(data);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const result = await getApplicationsService(status as string);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};