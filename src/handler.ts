
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import ShortenerController from './controllers/ShortenerController';
import ShortenerService from './services/ShortenerService';
import ResponseBuilder from './utils/ResponseBuilder';
import DynamoDBRepository from './repositories/DynamoDBRepository';
import ShortIdHashGenerator from './utils/ShortIdHashGenerator';
import RedisRepository from './repositories/RedisRepository';

const hashGenerator = new ShortIdHashGenerator()
const shortenerRepository = new DynamoDBRepository()
const cacheRepository = new RedisRepository()
const shortenerService = new ShortenerService(
  shortenerRepository,
  cacheRepository,
  hashGenerator
)
const responseBuilder = new ResponseBuilder()
const shortenerController = new ShortenerController(shortenerService, responseBuilder);

export const short = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await shortenerController.short(event)
};

export const resolve = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await shortenerController.resolve(event)
};

export const update = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return await shortenerController.update(event)
};