import UrlModel from "../../src/models/UrlModel";
import IShortenerRepository from "../../src/repositories/IShortenerRepository";

export default class MockedDbRepository implements IShortenerRepository {
  save(url: UrlModel): Promise<void> {
    return Promise.resolve()
  }
  getById(id: string): Promise<UrlModel> {
    switch (id) {
      case '123':
      case 'not_found_on_cache':
        return Promise.resolve(new UrlModel(
          id,
          'https://maps.google.com',
          true,
          123,
          123
        ))

      case 'not_found':
        throw new Error('Not found')

      case 'disabled':
        return Promise.resolve(new UrlModel(
          id,
          'https://maps.google.com',
          false,
          123,
          123
        ))

    }
  }
}

