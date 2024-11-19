const request = require("supertest");
const app = require("./src/app");

test("GET /musicians returns all musicians", async () => {
  const response = await request(app).get("/musicians");
  expect(response.statusCode).toBe(200);

  const musicians = JSON.parse(response.text);
  expect(Array.isArray(musicians)).toBe(true);

  expect(musicians[0]).toHaveProperty("id");
  expect(musicians[0]).toHaveProperty("name");
  expect(musicians[0]).toHaveProperty("instrument");
  expect(musicians[0]).toHaveProperty("createdAt");
  expect(musicians[0]).toHaveProperty("updatedAt");

  expect(musicians[0].name).toBe("Mick Jagger");
});
