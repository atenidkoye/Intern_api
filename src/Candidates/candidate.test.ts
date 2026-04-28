import request from "supertest";
import app from "../app";

describe("Candidates API", () => {
  it("should create candidate", async () => {
    const res = await request(app).post("/api/candidates").send({
      full_name: "Jane Doe",
      email: "jane@test.com",
    });

    expect(res.statusCode).toBe(201);
  });
});