import * as nanoid from 'nanoid'
import IHashGenerator from "./IHashGenerator";

export default class ShortIdHashGenerator implements IHashGenerator {
  public generate(): string {
    const uid = nanoid.nanoid(10);
    return uid;
  }
}