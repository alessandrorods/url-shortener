import { APIGatewayProxyStructuredResultV2 } from "aws-lambda"
import ShortenerController from "../../src/controllers/ShortenerController"
import ShortenerService from "../../src/services/ShortenerService"
import ResponseBuilder from "../../src/utils/ResponseBuilder"
import ShortIdHashGenerator from "../../src/utils/ShortIdHashGenerator"
import MockedCacheRepository from "../mocks/MockedCacheRepository"
import MockedDbRepository from "../mocks/MockedDbRepository"

const context = {} as never;
const inputMock = {
  destination: "https://maps.google.com",
  enabled: true
}

describe("Shortener Controller tests", () => {

  const dbRepository = new MockedDbRepository()
  const cacheRepository = new MockedCacheRepository()
  const shortenerService = new ShortenerService(dbRepository, cacheRepository, new ShortIdHashGenerator())
  const shortenerController = new ShortenerController(shortenerService, new ResponseBuilder())

  it("should create a short URL", async () => {
    const payload = { body: JSON.stringify(inputMock) } as never;
    const res = (await shortenerController.short(
      payload
    )) as APIGatewayProxyStructuredResultV2;
    const resBody = JSON.parse(res.body ?? "{}");
    expect(resBody).toHaveProperty("shortenedUrl");
    expect(res.statusCode).toBe(201)
  });

  it("should redirect to destination", async () => {
    const payload = {
      pathParameters: {
        id: '123'
      }
    } as never;
    const res = (await shortenerController.resolve(
      payload
    )) as APIGatewayProxyStructuredResultV2;
    const resBody = JSON.parse(res.body ?? "{}");
    expect(res.statusCode).toBe(302)
    expect(res.headers.Location).toBe("https://maps.google.com")
  });

  it("should return 404 when short url not exists", async () => {
    const payload = {
      pathParameters: { id: 'not_found' }
    } as never;
    const res = (await shortenerController.resolve(
      payload
    )) as APIGatewayProxyStructuredResultV2;
    const resBody = JSON.parse(res.body ?? "{}");
    expect(res.statusCode).toBe(404)
  });

  it("should update a short URL", async () => {
    const linkedin = "https://linkedin.com"
    inputMock.destination = linkedin
    const payload = {
      body: JSON.stringify(inputMock),
      pathParameters: { id: '123' }
    } as never;
    const res = (await shortenerController.update(
      payload
    )) as APIGatewayProxyStructuredResultV2;
    const resBody = JSON.parse(res.body ?? "{}");
    expect(resBody).toHaveProperty("shortenedUrl");
    expect(res.statusCode).toBe(200)
    expect(resBody.destinationUrl).toBe(linkedin)
  });

  it("should return 404 when a short URL is not found on update", async () => {
    const payload = {
      body: JSON.stringify(inputMock),
      pathParameters: { id: 'not_found' }
    } as never;
    const res = (await shortenerController.update(
      payload
    )) as APIGatewayProxyStructuredResultV2;
    const resBody = JSON.parse(res.body ?? "{}");
    expect(res.statusCode).toBe(404)
  });
})