import UrlModel from "../../src/models/UrlModel";
import DynamoDBRepository from "../../src/repositories/DynamoDBRepository";

const mockedUrlModel = new UrlModel(
  '123',
  'https://maps.google.com',
  false,
  123,
  123
)

const mockedSetFn = jest.fn(() => Promise.resolve())
const mockedGetFn = jest.fn(() => Promise.resolve({
  Item: {
    destinationUrl: { S: mockedUrlModel.getDestinationUrl() },
    enabled: { B: mockedUrlModel.getEnabled() },
    createdAt: { N: mockedUrlModel.getCreatedAt() },
    updatedAt: { N: mockedUrlModel.getUpdatedAt() }
  }
}))

jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDB: jest.fn(() => {
      return {
        putItem: mockedSetFn,
        getItem: mockedGetFn
      }
    })
  }
})

describe("Redis Repository tests", () => {

  const dynamoDBRepository = new DynamoDBRepository()

  it("should save", async () => {
    await dynamoDBRepository.save(mockedUrlModel)
    expect(mockedSetFn).toBeCalledTimes(1)
  })

  it("should get from cache", async () => {
    await dynamoDBRepository.getById('123')
    expect(mockedGetFn).toBeCalledTimes(1)
  })
})