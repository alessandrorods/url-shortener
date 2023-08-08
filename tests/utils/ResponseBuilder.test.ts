import ResponseBuilder from "../../src/utils/ResponseBuilder"

describe("Response Builder tests", () => {
  it("should parse a response", () => {
    const responseBuilder = new ResponseBuilder()
    const response = responseBuilder
      .status(200)
      .body({ key: 'value' })
      .headers({
        "Content-Type": "application/json"
      })
      .build()
    expect(response).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify({ key: 'value' }),
      headers: {
        "Content-Type": "application/json"
      }
    })
  })
})