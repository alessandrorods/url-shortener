<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->



# URL Shortener
A Technical Challenge Case

## Table of Contents
- [Architecture](#architecture)
- [Getting Started](#getting-started)
	- [Tools Required](#tools-required)
	- [Installation](#installation)
- [Development](#development)
    - [Part 1: Heading](#part-1-heading)
	  - [Step 1: Subheading](#step-1-subheading)
	  - [Step 2: Subheading](#step-2-subheading)
	- [Part 2: Heading](#part-2-heading)
- [Running the App](#running-the-app)
- [Deployment](#deployment)
- [Author](#author)

## Getting Started
URL Shortener is a fully serverless based application, Serverless Framework is required to run the project and below is a guide to install the framework and requirements

Other details that need to be given while starting out with the project can be provided in this section. A project structure like below can also be included for the big projects:

```
	project-title
	├── README.md
	├── package.json
	├── .gitignore
	├── public
	│   ├── favicon.ico
	│   ├── index.html
	│   └── manifest.json
	└── src
		├── App.css
		├── App.js
		├── App.test.js
		├── index.css
		├── index.js
		├── logo.svg
		└── serviceWorker.js
		└── setupTests.js
```

### Requirements

The shortener application will be writen with NodeJS using Serverless Framework. You need the following installations:

1. Install NodeJS
	* [NodeJS Download](https://nodejs.org/en/download)
2. Install Serverless Framework
	* `npm install -g serverless`

`npm` is a depenency manager for JavaScript applications and will be installed with NodeJS on step 1.

### Installation

Before your firt execution of application, run:
`npm install`

This will be install all project dependencies necessary to run application.


### Setup Environment Variables
The environment variables need to be located into path `./.env/serverless.config.yml` and the content need to be like the example below:

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
You can also use the `serverless.config.example.yml` template file to setup your environment variables.

The environment variables will define connection with DynamoDB, Redis and Lambda permissions and subnet configs.

### Testing
To execute tests just run
`npm run test`

Coverage Report will be created on the path `./coverage/lconv/index.html`
Open file in the browser to get a UI with coverage report data


## Development

This section is completely optional. For big projects, the developement strategies are not discussed. But for small projects, you can give some insight to people. It has 2 benefits in my opinion:

1. It's a way to give back to the community. People get to learn from you and appreciate your work
2. You can refer the README in future as a quick refresher before an interview or for an old project to check if it can help you in your currect work

### Part 1: Heading

#### Step 1: Subheading

* Mention the steps here
  * You can also have nested steps to break a step into small tasks
  
#### Step 2: Subheading

* Mention the steps here.
  * You can also have nested steps to break a step into small tasks

For details now how everything has been implemented, refer the source code

### Part 2: Heading

* Mention the steps here

## Running the App
Steps and commands for running the app are to be included here
* Example steps:
  ```npm install```

## Deployment
To deploy the application into AWS, open CLI terminal and navigate to the root project folder, then use the command `serverless deploy`.

AWS Credentials file need to be propperly configured into your local environment to deploy serverless application. 

See [serverless deploy](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy) for more information about deploy with Serverless Framework.


## Author

Alessandro Rodrigues dos Santos
* [GitHub](https://github.com/alessandrorods)
* [LinkedIn](https://linkedin.com/in/alessandrorods)


# Serverless Framework Node HTTP API on AWS

This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

This template does not include any kind of persistence (database). For more advanced examples, check out the [serverless/examples repository](https://github.com/serverless/examples/) which includes Typescript, Mongo, DynamoDB and other examples.

## Usage

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "message": "Go Serverless v2.0! Your function executed successfully!",
  "input": {
    ...
  }
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
  "statusCode": 200,
  "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```


Alternatively, it is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
