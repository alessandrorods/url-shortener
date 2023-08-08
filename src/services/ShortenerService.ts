import ShortenUrlRequestDto from "../dtos/ShortenUrlRequestDto";
import UrlModel from "../models/UrlModel";
import IShortenerRepository from "../repositories/IShortenerRepository";
import IHashGenerator from "../utils/IHashGenerator";
import IShortenerService from "./IShortenerService";

export default class ShortenerService implements IShortenerService {

  constructor(
    private dbRepository: IShortenerRepository,
    private cacheRepository: IShortenerRepository,
    private hashGenerator: IHashGenerator
  ) { }

  async short(shortenRequest: ShortenUrlRequestDto): Promise<UrlModel> {
    const timezone = new Date().getTime()
    const urlData = new UrlModel(
      this.hashGenerator.generate(),
      shortenRequest.destination,
      shortenRequest.enabled ?? true,
      timezone,
      timezone
    )

    await this.dbRepository.save(urlData)
    this.cacheRepository.save(urlData)

    urlData.setShortenedUrl()

    return urlData
  }

  async resolve(shortId: string): Promise<UrlModel> {
    try {
      const urlFromCache = await this.cacheRepository.getById(shortId)
      if (!urlFromCache.getEnabled()) throw new Error('URL is disabled')
      return urlFromCache
    }
    catch (e) {
      const urlFromDB = await this.dbRepository.getById(shortId)
      if (!urlFromDB.getEnabled()) throw new Error('URL is disabled')
      this.cacheRepository.save(urlFromDB)
      return urlFromDB
    }
  }

  async update(shortId: string, shortenRequest: ShortenUrlRequestDto): Promise<UrlModel> {

    const currentUrl = await this.dbRepository.getById(shortId)

    const timezone = new Date().getTime()
    const urlData = new UrlModel(
      shortId,
      shortenRequest.destination,
      shortenRequest.enabled ?? currentUrl.getEnabled(),
      currentUrl.getCreatedAt(),
      timezone
    )

    await this.dbRepository.save(urlData)
    await this.cacheRepository.save(urlData)

    urlData.setShortenedUrl()

    return urlData
  }

}