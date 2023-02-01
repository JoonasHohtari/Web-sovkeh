const { describe, test, expect, afterAll } = require("@jest/globals");
const supertest = require("supertest");

const connection = require("../db/pool.js");

const app = require("../app");

describe("GET cities endpoint", () => {
  test("should return 200", (done) => {
    supertest(app).get("/api/cities").expect(200).end(done);
  });

  test("should return json data", async () => {
    const response = await supertest(app)
      .get("/api/cities")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          capital: "Oslo",
          country: "Norway",
        }),
        expect.objectContaining({
          id: 2,
          capital: "Pretoria",
          country: "South Africa",
        }),
      ])
    );
  });
});

describe("GET city by id endpoint", () => {
  test("should return 200 if item was found", (done) => {
    supertest(app).get("/api/cities/1").expect(200).end(done);
  });
  test("Should return 200 and json if the item was found", async () => {
    const response = await supertest(app)
      .get("/api/cities/1")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        capital: "Oslo",
        country: "Norway",
      })
    );
  });
});

describe("POST city endpoint", () => {
  afterAll(async () => {
    const deleteQuery =
      "DELETE FROM cities WHERE capital LIKE 'Test Town' AND country LIKE 'Test Country';";
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });
  test("should create a new city", async () => {
    const city = {
      capital: "Test Town",
      country: "Test Country",
    };

    const response = await supertest(app)
      .post("/api/cities")
      .set("Accept", "application/json")
      .set("content", "application/json")
      .send(city);

    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.capital).toEqual("Test Town");
  });

  test("should not create a city without a capital property", async () => {
    const city = {
      country: "Test Country",
    };

    const response = await supertest(app)
      .post("/api/cities")
      .set("Accept", "application/json")
      .set("content", "application/json")
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"capital" is required');
  });

  test("should not create a city without a country property", async () => {
    const city = {
      capital: "Test Town",
    };

    const response = await supertest(app)
      .post("/api/cities")
      .set("Accept", "application/json")
      .set("content", "application/json")
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"country" is required');
  });

  test("should not create a city with empty capital property", async () => {
    const city = {
      capital: "",
      country: "Test Country",
    };

    const response = await supertest(app)
      .post("/api/cities")
      .set("Accept", "application/json")
      .set("content", "application/json")
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"capital" is not allowed to be empty');
  });

  test("should not create a city with empty country property", async () => {
    const city = {
      capital: "Test Town",
      country: "",
    };

    const response = await supertest(app)
      .post("/api/cities")
      .set("Accept", "application/json")
      .set("content", "application/json")
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"country" is not allowed to be empty');
  });

  test("should not create a city capital a too short value", async () => {
    const city = {
      capital: "Rig",
      country: "Test Country",
    };

    const response = await supertest(app)
      .post("/api/cities")
      .set("Accept", "application/json")
      .set("content", "application/json")
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"capital" length must be at least 4 characters long'
    );
  });

  test("should not create a city, country with a too short value", async () => {
    const city = {
      capital: "Test Town",
      country: "Ira",
    };

    const response = await supertest(app)
      .post("/api/cities")
      .set("Accept", "application/json")
      .set("content", "application/json")
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"country" length must be at least 4 characters long'
    );
  });

  test("should not create a duplicate city", async () => {
    const city = {
      capital: "Oslo",
      country: "Norway",
    };

    const response = await supertest(app)
      .post("/api/cities")
      .set("Accept", "application/json")
      .set("content", "application/json")
      .send(city);

    expect(response.status).toEqual(400);
    expect(response.text).toContain("City already exists in database");
  });
});

describe("DELETE cities endpoint", () => {
  test("should delete the city by id", async () => {
    const city = {
      capital: "Test Town Delete",
      country: "Test Country Delete",
    };
    const postResponse = await supertest(app)
      .post("/api/cities")
      .set("Accept", "application/json")
      .send(city);

    const postID = postResponse.body.id;

    const deleteResponse = await supertest(app)
      .delete(`/api/cities/${postID}`)
      .set("Accept", "application/json");

    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.text).toEqual("City deleted");
  });
});
