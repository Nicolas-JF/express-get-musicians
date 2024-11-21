const request = require("supertest");
const app = require("../../app");

describe("Musician Routes", () => {
    let musicianId;

    it("should create a new musician", async () => {
        const res = await request(app)
            .post("/musicians")
            .send({ name: "John Doe", instrument: "Guitar" });

        expect(res.status).toBe(201);
        expect(res.body.name).toBe("John Doe");
        expect(res.body.instrument).toBe("Guitar");

        musicianId = res.body.id;
    });

    it("should retrieve a musician by ID", async () => {
        const res = await request(app).get(`/musicians/${musicianId}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(musicianId);
        expect(res.body.name).toBe("John Doe");
        expect(res.body.instrument).toBe("Guitar");
    });

    it("should update a musician by ID", async () => {
        const res = await request(app)
            .put(`/musicians/${musicianId}`)
            .send({ name: "Jane Doe", instrument: "Drums" });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Jane Doe");
        expect(res.body.instrument).toBe("Drums");
    });

    it("should delete a musician by ID", async () => {
        const res = await request(app).delete(`/musicians/${musicianId}`);

        expect(res.status).toBe(204);
    });

    it("should return 404 for deleted musician", async () => {
        const res = await request(app).get(`/musicians/${musicianId}`);

        expect(res.status).toBe(404);
    });
});