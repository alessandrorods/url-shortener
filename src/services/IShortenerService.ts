import ShortenUrlRequestDto from "../dtos/ShortenUrlRequestDto";
import UrlModel from "../models/UrlModel";

export default interface IShortenerService {
  short(shortenRequest: ShortenUrlRequestDto): Promise<UrlModel>
  resolve(shortId: string): Promise<UrlModel>
  update(shortId: string, shortenRequest: ShortenUrlRequestDto): Promise<UrlModel>
}