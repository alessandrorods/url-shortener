import ShortenUrlRequestDto from "../dtos/ShortenUrlRequestDto";
import IShortenerService from "../services/IShortenerService";
import IResponseBuilder from "../utils/IResponseBuilder";

export default class ShortenerController {

  constructor(
    private shortenerService: IShortenerService,
    private responseBuilder: IResponseBuilder
  ) { }

  async short(event: any) {
    const shortenRequest: ShortenUrlRequestDto = JSON.parse(event.body)
    const shortedUrl = await this.shortenerService.short(shortenRequest)
    return this.responseBuilder
      .status(200)
      .body(shortedUrl)
      .build()
  }

  async resolve(event: any) {
    try {
      const id = event.pathParameters.id
      const resolvedUrl = await this.shortenerService.resolve(id)
      return this.responseBuilder
        .status(301)
        .headers({
          Location: resolvedUrl.getDestinationUrl()
        })
        .build()
    }
    catch (e) {
      return this.responseBuilder
        .status(404)
        .build()
    }
  }

  async update(event: any) {
    try {
      const id = event.pathParameters.id
      const shortenRequest: ShortenUrlRequestDto = JSON.parse(event.body)
      const updatedUrl = await this.shortenerService.update(id, shortenRequest)
      return this.responseBuilder
        .status(200)
        .body(updatedUrl)
        .build()
    }
    catch (e) {
      return this.responseBuilder
        .status(404)
        .build()
    }
  }

}