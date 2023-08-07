import ShortUniqueId from "short-unique-id";
import IHashGenerator from "./IHashGenerator";

export default class ShortIdHashGenerator implements IHashGenerator {
  public generate(destinationUrl: string): string {
    const uid = new ShortUniqueId({ length: 10 });
    return uid();
  }
}