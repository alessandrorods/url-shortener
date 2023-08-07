export default interface HashGenerator {
  generate(destinationUrl: string): string
}