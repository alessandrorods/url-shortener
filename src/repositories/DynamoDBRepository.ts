import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"
import UrlModel from '../models/UrlModel';
import IShortenerRepository from './IShortenerRepository';


export default class DynamoDBRepository implements IShortenerRepository {

  private dynamoClient: DynamoDB

  constructor() {
    this.dynamoClient = new DynamoDB({ region: process.env.DYNAMODB_REGION });
  }

  async save(url: UrlModel) {
    await this.dynamoClient.putItem({
      TableName: process.env.DYNAMODB_TABLE,
      Item: marshall({
        id: url.getId(),
        destinationUrl: url.getDestinationUrl(),
        enabled: url.getEnabled(),
        createdAt: url.getCreatedAt().toString(),
        updatedAt: url.getUpdatedAt().toString()
      })
    })
  }


  async getById(id: string): Promise<UrlModel> {

    const response = await this.dynamoClient.getItem({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: { S: id }
      }
    })
    const urlData = unmarshall(response.Item)

    return new UrlModel(
      id,
      urlData.destinationUrl,
      urlData.enabled,
      urlData.createdAt,
      urlData.updatedAt
    )
  }
}