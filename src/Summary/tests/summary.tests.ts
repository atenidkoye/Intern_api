import request from "supertest";
import app from "../../app";

describe("Summary API", () => {
  it("should return summary counts", async () => {
    const res = await request(app).get("/api/summary");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});