const request = require('supertest')
const { expect } = require('chai')
const myRequest = request('http://localhost:5000/api')

describe('scraping websites' , ()=>{
  it('its should return an result with statuscode 200 /api/scraper/', async () =>{
    const testScrap={
      url:"https://www.lanacion.com.ar/",
      objectClass:".com-link",
      keyWord:"la"
    }
    const response = await myRequest.post("/scraper").send(testScrap)
    expect(response.statusCode).to.be.equal(200)
  } )
  it('its should return an json with an error message/api/scraper/', async () => {
    const testScrap = {
      url: "",
      objectClass: ".com-link",
      keyWord: "la"
    }
    const response = await myRequest.post("/scraper").send(testScrap)
    expect(response.text).to.be.equal("{\"error\":\"invalid url\",\"status\":404}")
  })
});
