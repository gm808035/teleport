const request = require('supertest');

const server = request("http://localhost:3000");
const url = `/production/user`;

const payload = {
    name: "wildmint"
}
describe("POST /user", () => {

    it("when getting venues then return 200", async () => {
        const response = await server
            .post(url)
            .send(payload)
            .expect(200)
        expect(response.body).toMatchObject({
            conncectionId: expect.any(String),
            name: "wildmint",
        });
    });

});
describe("GET /user/{id}", () => {
    it("when getting venues then return 200", async () => {
        const id = await
        server
        .post(url)
        .send({...payload, name: "test user"})
        .expect(200)

        const response = await server
            .get(`${url}/${id.body.conncectionId}`)
            .expect(200)

        expect(response.body).toMatchObject({
            conncectionId: expect.any(String),
            name: "test user",
        });

    });
});