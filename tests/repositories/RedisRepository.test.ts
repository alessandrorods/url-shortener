import UrlModel from "../../src/models/UrlModel";
import RedisRepository from "../../src/repositories/RedisRepository"

const mockedUrlModel = new UrlModel(
  '123',
  'https://maps.google.com',
  false,
  123,
  123
)

const mockedSetFn = jest.fn(() => Promise.resolve())
const mockedExpireAtFn = jest.fn(() => Promise.resolve())
const mockerGetFn = jest.fn(() => Promise.resolve(JSON.stringify(mockedUrlModel)))

jest.mock('ioredis', () => {
  return {
    default: jest.fn(() => {
      return {
        set: mockedSetFn,
        expireat: mockedExpireAtFn,
        get: mockerGetFn
      }
    })
  };
});

describe("Redis Repository tests", () => {

  const redisRepository = new RedisRepository()

  it("should save", async () => {
    const save = await redisRepository.save(mockedUrlModel)
    expect(mockedSetFn).toBeCalledTimes(1)
    expect(mockedExpireAtFn).toBeCalledTimes(1)
  })

  it("should get from cache", async () => {
    const urlModelFromCache = await redisRepository.getById('123')
    expect(urlModelFromCache.getId()).toBe(mockedUrlModel.getId())
  })
})