const request = require("supertest");
const { expect } = require("chai");
const myRequest = request("http://localhost:5000/api");

describe("status 400", () => {
  it("should return statusCode 400 bad request /api/scrape/", async () => {
    const testScrap = {
      url: "",
      objectClass: ".post",
      keyWord: "linux",
    };
    const response = await myRequest.post("/scrape").send(testScrap);
    expect(response.text).to.be.equal('{"message":"Invalid input"}');
  });
  it("should return statusCode 400 bad request /api/scrape", async () => {
    const testScrap = {
      url: "",
      objectClass: "",
      keyWord: "",
    };
    const response = await myRequest.post("/scrape").send(testScrap);
    expect(response.statusCode).to.be.equal(400);
  });
});

describe("status 200", () => {
  it("should return statuscode 200 /api/scrape/", async () => {
    const testScrap = {
      url: "https://libreddit.de/r/linux",
      objectClass: ".post_title",
      keyWord: "linux",
    };
    const response = await myRequest.post("/scrape").send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
  it("should return statusCode 200 /api/scrape", async () => {
    const testScrap = {
      url: "https://libreddit.de/r/linux",
      objectClass: ".post_title",
    };
    const response = await myRequest.post("/scrape").send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
});
