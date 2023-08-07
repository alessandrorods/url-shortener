import UrlModel from "../models/UrlModel";

export default interface IShortenerRepository {
  save(url: UrlModel): Promise<void>
  getById(id: string): Promise<UrlModel>
}