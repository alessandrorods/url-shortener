import IHashGenerator from "./IHashGenerator";
import * as crc32 from "crc32"

export default class Crc32HashGenerator implements IHashGenerator {
  public generate(destinationUrl: string): string {
    return crc32(destinationUrl)
  }
}