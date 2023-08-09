import Redis from "ioredis";
import UrlModel from "../models/UrlModel";
import IShortenerRepository from "./IShortenerRepository";

export default class RedisRepository implements IShortenerRepository {
  private redis: Redis
  private expirationTimestamp: number

  constructor() {
    const redis = new Redis(parseInt(process.env.REDIS_PORT), process.env.REDIS_HOST, {
      connectTimeout: 10000,
    });

    this.redis = redis;
    this.expirationTimestamp = (new Date().getTime() / 1000) + parseInt(process.env.REDIS_TTL_SECONDS)
  }

  async save(url: UrlModel) {
    await this.redis.set(`${url.getId()}`, JSON.stringify(url))
    this.redis.expireat(`${url.getId()}`, this.expirationTimestamp)
  }

  async getById(id: string): Promise<UrlModel> {
    const redisResponse = await this.redis.get(`${id}`)
    this.redis.expireat(`${id}`, this.expirationTimestamp + parseInt(process.env.REDIS_TTL_SECONDS))
    const urlData = JSON.parse(redisResponse)

    return new UrlModel(
      id,
      urlData.destinationUrl,
      urlData.enabled,
      urlData.createdAt,
      urlData.updatedAt
    )
  }

}