# URL Shortener
A technical challenge case

## Table of Contents
- [Getting Start](#getting-start)
	- [Others docs](#others-docs)
	- [Requirements](#requirements)
	- [Install](#install)
	- [Setup environment variables](#setup-environment-variables)
- [Running application locally](#running-application-locally)
- [Tests](#tests)
- [Project Pattern](#project-pattern)
- [The handler.ts launcher](#the-handlerts-launcher)
- [Shortening algorithm](#shortening-algorithm)
- [Deploy](#deploy)
- [Author](#author)

## Getting Start
Here you will find all the steps to run, test and deploy the url shortener application.

### Others docs
- [API Documentation](https://app.swaggerhub.com/apis-docs/ALESSANDRO72/shortener-url-docs/1.0.0)
- [Architecture Documentation](https://github.com/alessandrorods/url-shortener/wiki)

### Requirements
The shortener uses NodeJS with Serverless Framework. You will need the installations bellow:

1. Install NodeJS
	* [NodeJS Download](https://nodejs.org/en/download)
2. Install the Serverless Framework
	* `npm install -g serverless`

`npm` is a dependency manager for JavaScript application, he will be installed with NodeJS installation, on the step 1.

### Install
To install all project dependecies, just run the command `npm install` on the application root folder.


### Setup environment variables
The environment variables are located on `./.env/serverless.config.yml` and the content need to be like the example below:
```
DYNAMODB_TABLE: DYNAMO-TABLE
DYNAMODB_REGION: us-east-1
REDIS_PORT: 6379
REDIS_HOST: REDIS-HOST
REDIS_TTL_SECONDS: 3600
SUBNET1: SUBNET1-ID
SUBNET2: SUBNET2-ID
SUBNET3: SUBNET3-ID
SECURITY_GROUP: SECURITYGROUP-ID
SHORTENER_DOMAIN: https://app-base-domain.com
```
Also are is possible to use the `serverless.config.example.yml` template to setup your environment variables.

## Running application locally
After all steps above you will be ready to run application locally.
Run the command `npm run dev` to start local AWS Lambda endpoints.

The Serverless Framework will show the endpoints of application with the HTTP verbs.
Will be like that:
```
   ┌──────────────────────────────────────────────────────────────────────────────┐
   │                                                                              │
   │   POST | http://localhost:3000/                                              │
   │   POST | http://localhost:3000/2015-03-31/functions/shortenUrl/invocations   │
   │   GET  | http://localhost:3000/{id}                                          │
   │   POST | http://localhost:3000/2015-03-31/functions/resolveUrl/invocations   │
   │   PUT  | http://localhost:3000/{id}                                          │
   │   POST | http://localhost:3000/2015-03-31/functions/updateUrl/invocations    │
   │                                                                              │
   └──────────────────────────────────────────────────────────────────────────────┘
To know more about `serverless offline`, see these [GitHub repository](https://github.com/dherault/serverless-offline).

```


## Tests
To run the unit tests just run the command at terminal:
`npm run test`

The tests results and coverage report will be printed on terminal, but is possible to see detailed coverage per file information. Just open theese file into your browser `./coverage/lcov-report/index.html`

Actually the application have 100% of coverage on tests. Here is a full report of unit tests:
```
--------------------------|---------|----------|---------|---------|-------------------
File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------------|---------|----------|---------|---------|-------------------
All files                 |     100 |      100 |     100 |     100 |                   
 src                      |     100 |      100 |     100 |     100 |                   
  handler.ts              |     100 |      100 |     100 |     100 |                   
 src/controllers          |     100 |      100 |     100 |     100 | 
  ShortenerController.ts  |     100 |      100 |     100 |     100 | 
 src/models               |     100 |      100 |     100 |     100 | 
  UrlModel.ts             |     100 |      100 |     100 |     100 | 
 src/repositories         |     100 |      100 |     100 |     100 | 
  DynamoDBRepository.ts   |     100 |      100 |     100 |     100 | 
  RedisRepository.ts      |     100 |      100 |     100 |     100 | 
 src/services             |     100 |      100 |     100 |     100 | 
  ShortenerService.ts     |     100 |      100 |     100 |     100 | 
 src/utils                |     100 |      100 |     100 |     100 | 
  Crc32HashGenerator.ts   |     100 |      100 |     100 |     100 | 
  ResponseBuilder.ts      |     100 |      100 |     100 |     100 | 
  ShortIdHashGenerator.ts |     100 |      100 |     100 |     100 |
--------------------------|---------|----------|---------|---------|-------------------

Test Suites: 9 passed, 9 total
Tests:       31 passed, 31 total
Snapshots:   0 total
Time:        32.691 s
Ran all test suites.
```


## Project Pattern
The application is structured using Service Pattern and Repository Pattern. All business layers was into services and the database connection and infra resources was into repositories.
```
- src
	- controllers
	- services
	- repositories
```
* `controllers`: Have responsability to connect the HTTP request data with business rules layers on the services. Controllers never had a connection with external resources, like databases or queues.
* `services`: Have responsability to keep and execute all business rules, and connect with repositories to access external layers of infrastructure.
* `repositories`: Have responsability to receive and store data into infrastructure resources like caches and databases. Business rules don't appear on repositories.

The following folders are also present on project structure:
* `dtos`: The DTOs (Data-Transfer-Objects) set the data pattern that will be used on the Controllers
* `models`: Are the domain objects used into Repository and Service data transfer. Are also called Entity.
* `utils`: General use classes, like helpers, parsers or others.

The final project structure is the following:
```
- src
	- controllers
	- dtos
	- models
	- repositories
	- services
	- utils
```

## The handler.ts launcher
The Serverless Framework does no have native support to OOP, so it is necessary to use the `handler.ts` file as launcher to manually manage the object instances and dependencies injection.
This file acts are a entry-point of application, launching all endpoints.

```typescript
...
const shortenerController = new ShortenerController(shortenerService, responseBuilder);

export const short = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	return await shortenerController.short(event)
};
```
On example above, the initializer create a new instance of `ShortenerController` and use it on the `short()` function that will be user as a entry-point from the Serverless Framework.

Is also performed the dependency injection of the objects `ShortenerService` and `ResponseBuilder`, these classes were also instantiated in the `handler.ts` file.

On the `serverless.yml` configuration file the function of the endpoint to shorten url point to function at `./src/handler.short` to be the lambda handler.
```yml
...
functions:
  shortenUrl:
    handler: ./src/handler.short
    events:
      - httpApi:
          path: /
          method: post
```

## Shortening algorithm
Some alternatives are possible to generate the a short code for each URL. The main question about shortening algorithm is the collision probability, that can be generate a existing code.

The algorithm uses a library called nanoid that have a smaller probability of duplicate IDs.
Using a short ID with 10 bytes, and generating 1000 short URLs per hour, we have:

```
~17 years or 152M IDs needed, in order to have a 1% probability of at least one collision.
```
*Simulation from the [Nano ID Collision Calculator](https://zelark.github.io/nano-id-cc/)*

### onCollision event _(a nice to have insight)_
Sometime a collision will occours! A *nice-to-have* solution will be a onCollision retry event, to generate a another *nanoid* ID now using 11 bytes.
With a length of 11 characters and generating 1000 short URLs per hour, the collision probability have a decrease:
```
~139 years or 1B IDs needed, in order to have a 1% probability of at least one collision.
```
*Simulation from the [Nano ID Collision Calculator](https://zelark.github.io/nano-id-cc/)*

### Same ID for same URL _(another nice to have insight)_
Another solution to reduce collision probability is use of same short ID when the exact destination was existing on the database.
For that will be needed check if destination is existing into database before generate the short ID, and if exists just use the existing short ID.

## Deploy
To deploy the application on AWS just run `serverless deploy` on terminal.

The (AWS Credentials)[https://serverless.com/framework/docs/providers/aws/guide/credentials/] need be corretly setup on your local environment to deploy works.

For more information, check the [Serverless Framework deploy documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy).


## Author
Alessandro Rodrigues dos Santos
* [GitHub](https://github.com/alessandrorods)
* [LinkedIn](https://linkedin.com/in/alessandrorods)