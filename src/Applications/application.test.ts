import request from "supertest";
import app from "../app";

describe("Applications API", () => {
  it("should create application", async () => {
    const res = await request(app).post("/api/applications").send({
      candidate_id: 1,
      position: "Backend Intern",
      status: "applied",
    });

    expect(res.statusCode).toBe(201);
  });

  it("should reject invalid status", async () => {
    const res = await request(app).post("/api/applications").send({
      candidate_id: 1,
      position: "Backend Intern",
      status: "wrong",
    });

    expect(res.statusCode).toBe(400);
  });
});