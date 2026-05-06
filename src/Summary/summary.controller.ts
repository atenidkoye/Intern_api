import { Request, Response } from "express";

import {
  getSummaryService,
  getApplicationStatusSummaryService,
} from "./summary.service";

// GET OVERALL SUMMARY

export const getSummary = async (
  _: Request,
  res: Response
): Promise<void> => {

  try {

    const result =
      await getSummaryService();

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

// GET APPLICATION STATUS SUMMARY

export const getApplicationStatusSummary =
  async (
    _: Request,
    res: Response
  ): Promise<void> => {

    try {

      const result =
        await getApplicationStatusSummaryService();

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