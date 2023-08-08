import ShortUniqueId from "short-unique-id";
import { nanoid } from 'nanoid'
import IHashGenerator from "./IHashGenerator";

export default class ShortIdHashGenerator implements IHashGenerator {
  public generate(): string {
    const uid = nanoid(10);
    return uid;
  }
}