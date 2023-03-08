const request = require("supertest");
const { expect } = require("chai");
const myRequest = request("http://localhost:5000/api");

describe("scraping websites", () => {
  it("its should return an result with statuscode 200 /api/scraper/", async () => {
    const testScrap = {
      url: "https://www.lanacion.com.ar/",
      objectClass: ".com-link",
      keyWord: "la",
    };
    const response = await myRequest.post("/scraper").send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
  it("its should return an json with an error message/api/scraper/", async () => {
    const testScrap = {
      url: "",
      objectClass: ".com-link",
      keyWord: "la",
    };
    const response = await myRequest.post("/scraper").send(testScrap);
    expect(response.text).to.be.equal(
      '{"error":{"status":404,"message":"Not Found"}}'
    );
  });
  it("should return an json with statusCode 200 /api/scraper", async () => {
    const testScrap = {
      url: "https://www.lanacion.com.ar/",
      objectClass: ".com-link",
    };
    const response = await myRequest.post("/scraper").send(testScrap);
    expect(response.statusCode).to.be.equal(200);
  });
 it('should return an error with 400 bad request', async()=>{
   const testScrap = {
      url: "",
      objectClass: "",
    };
    const response = await myRequest.post("/scraper").send(testScrap);
    expect(response.statusCode).to.be.equal(400);

 })
});
