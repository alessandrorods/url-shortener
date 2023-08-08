export default class UrlModel {
  private id: string
  private shortenedUrl: string
  private destinationUrl: string
  private enabled: boolean
  private createdAt: number
  private updatedAt: number

  constructor(
    id: string,
    destinationUrl: string,
    enabled: boolean,
    createdAt: number,
    updatedAt: number,
  ) {
    this.id = id
    this.destinationUrl = destinationUrl
    this.enabled = enabled
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  public getId() { return this.id }
  public getDestinationUrl() { return this.destinationUrl }
  public getEnabled() { return this.enabled }
  public getCreatedAt() { return this.createdAt }
  public getUpdatedAt() { return this.updatedAt }

  public setShortenedUrl() {
    this.shortenedUrl = `${process.env.SHORTENER_DOMAIN}/${this.id}`
  }
}