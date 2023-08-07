import { APIGatewayProxyResult } from "aws-lambda"

export interface Header {
  [header: string]: string
}

export default class Response {
  private responseStatusCode: number
  private responseBody: any
  private responseHeaders: Header = {
    "Content-Type": "application/json"
  }

  public status(statusCode: number) {
    this.responseStatusCode = statusCode
    return this
  }

  public body(object: any) {
    this.responseBody = JSON.stringify(object)
    return this
  }

  public headers(headers: Header) {
    this.responseHeaders = headers
    return this
  }

  public build(): APIGatewayProxyResult {
    return {
      statusCode: this.responseStatusCode,
      body: this.responseBody,
      headers: this.responseHeaders
    }
  }
}