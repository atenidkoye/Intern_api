import request from "supertest";
import app from "../src/app";

describe("Candidate API", () => {
  it("should create candidate", async () => {
    const res = await request(app).post("/api/candidates").send({
      full_name: "John Doe",
      email: "john@test.com"
    });

    expect(res.statusCode).toBe(201);
  });

  it("should reject duplicate email", async () => {
    await request(app).post("/api/candidates").send({
      full_name: "Jane",
      email: "dup@test.com"
    });

    const res = await request(app).post("/api/candidates").send({
      full_name: "Jane2",
      email: "dup@test.com"
    });

    expect(res.statusCode).toBe(400);
  });
});