import { resolve, short, update } from "../src/handler"

jest.mock("../src/repositories/DynamoDBRepository")
jest.mock("../src/repositories/RedisRepository")
const context = {} as never;
const inputMock = {
  destination: "https://maps.google.com",
  enabled: true
}

describe("handler initializer test", () => {

  const mockEvent = {
    body: JSON.stringify(inputMock),
    pathParameters: { id: '123' }
  } as never;

  it("should define controllers", async () => {
    const shortResponse = await short(mockEvent)
    const resolveResponse = await resolve(mockEvent)
    const updateResponse = await update(mockEvent)

    expect(shortResponse.statusCode).toBe(201)
    expect(resolveResponse.statusCode).toBe(404)
    expect(updateResponse.statusCode).toBe(404)
  })
})