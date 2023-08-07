import { APIGatewayProxyResult } from "aws-lambda"
import { Header } from "./ResponseBuilder"

export default interface IResponseBuilder {
  status(statusCode: number): IResponseBuilder
  body(object: any): IResponseBuilder
  headers(headers: Header): IResponseBuilder
  build(): APIGatewayProxyResult
}