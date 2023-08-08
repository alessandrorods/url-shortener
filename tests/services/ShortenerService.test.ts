import UrlModel from "../../src/models/UrlModel"
import ShortenerService from "../../src/services/ShortenerService"
import ShortIdHashGenerator from "../../src/utils/ShortIdHashGenerator"
import MockedCacheRepository from "../mocks/MockedCacheRepository"
import MockedDbRepository from "../mocks/MockedDbRepository"

describe("Shortener Service Tests", () => {

  const dbRepository = new MockedDbRepository()
  const cacheRepository = new MockedCacheRepository()
  const shortenerService = new ShortenerService(dbRepository, cacheRepository, new ShortIdHashGenerator())

  it("should test shortUrl function", async () => {
    const urlModel: UrlModel = await shortenerService.short({
      destination: "http://google.com/long-url",
      enabled: true
    })

    expect(urlModel.getEnabled()).toBe(true)
    expect(urlModel.getId()).toBeDefined()
  })

  it("should keep default enabled value when it not exists", async () => {
    const urlModel = await shortenerService.short({ destination: "http://google.com/long-url" })
    expect(urlModel.getEnabled()).toBe(true)
  })

  it("should resolve a URL getting from cache", async () => {
    const urlModel = await shortenerService.resolve('123')
    expect(urlModel.getId()).toBe('123')
  })

  it("should throw exception when URL not found", async () => {
    try {
      await shortenerService.resolve('not_found')
    }
    catch (e) {
      expect(e.message).toBe('Not found')
    }
  })

  it("should throw exception when URL is disabled", async () => {
    try {
      await shortenerService.resolve('disabled')
    }
    catch (e) {
      expect(e.message).toBe('URL is disabled')
    }
  })

  it("should resolve a URL when was not found on cache but found on db", async () => {
    const urlModel = await shortenerService.resolve('not_found_on_cache')
    expect(urlModel.getId()).toBe('not_found_on_cache')
  })

  it("should update a existing url", async () => {
    const new_destination = "http://new-destination.com"
    const urlModel: UrlModel = await shortenerService.update('123', {
      destination: new_destination,
      enabled: false
    })

    expect(urlModel.getEnabled()).toBe(false)
    expect(urlModel.getDestinationUrl()).toBe(new_destination)
    expect(urlModel.getId()).toBeDefined()
  })

  it("should update a existing url with default enabled value", async () => {
    const new_destination = "http://new-destination.com"
    const urlModel: UrlModel = await shortenerService.update('123', {
      destination: new_destination
    })
    expect(urlModel.getEnabled()).toBe(true)
  })

  it("should throw exception when URL not found on update", async () => {
    try {
      const new_destination = "http://new-destination.com"
      const res = await shortenerService.update('not_found', {
        destination: new_destination,
        enabled: false
      })
    }
    catch (e) {
      expect(e.message).toBe('Not found')
    }
  })

})