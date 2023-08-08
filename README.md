# Encurtador de URL
Case para Desafio Técnico

## Sumário
- [Comece por aqui](#comece-por-aqui)
	- [Requisitos](#requisitos)
	- [Instalação](#instalação)
	- [Configure as variávies de ambiente](#configure-as-variáveis-de-ambiente)
- [Executando a aplicação localmente](#executando-a-aplicação-localmente)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [O inicializador handlers.ts](#o-inicializador-handlerts)
- [Deploy](#deployment)
- [Autor](#autor)

## Comece por aqui
Este encurtador de URL utiliza uma arquitetura serverless e é executada através de funções Lambda da AWS. O framework Serverless Framework é um requisito para executar esta aplicação em ambiente local.

A documentação da API está disponível [neste link](https://link-para-swagger.com)

A documentação da Arquitetura está disponível [neste link](https://github.com/alessandrorods/meli-shortener-api/blob/main/docs/Architecure.md)

### Requisitos
O encurtado utiliza a linguagem NodeJS com o framework Serverless. Você precisará possuir as seguintes instalações:

1. Instalar NodeJS
	* [NodeJS Download](https://nodejs.org/en/download)
2. Instalar Framework Serverless
	* `npm install -g serverless`

`npm` é um gerenciador de dependências para aplicações que utilizam JavaScript, ele será instalado junto com a instalação do NodeJS, no passo 1.

### Instalação
Para instalar todas as dependências necessárias para a aplicação, basta executar o comando abaixo, no terminal na raiz do projeto:
`npm install`


### Configure as variáveis de ambiente
As variáveis de ambiente estão localizadas no arquivo `./.env/serverless.config.yml` e o conteúdo precisa ser algo parecido com o exemplo abaixo:
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
Você também pode usar o arquivo de template `serverless.config.example.yml` para configurar as variáveis de ambiente.

## Executando a aplicação localmente
Após seguir todos os passos acima você estará pronto para executar a aplicação em ambiente local. Para isso, basta executar no terminal o comando abaixo:
`npm run dev`

O framework Serverless exibirá a lista dos endpoints da aplicação, além dos seus verbos correspondentes.
Será algo parecido com:
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
Para entender mais sobre o comando `serverless-offline`, consulte a documentação nesse [repositório do GitHub](https://github.com/dherault/serverless-offline).

```


## Testes
Para executar os testes unitários, basta executar o comando abaixo no terminal:
`npm run test`

Um relatório de Coverage vai ser criado no caminho `./coverage/lconv/index.html`
Abra este arquivo no seu navegador para ter acesso a uma interface com os relatórios de coverage


## Estrutura do Projeto
Toda a aplicação está estruturada com Service Pattern e Repository Pattern. Todas as camadas e regras de negócio ficam nos services e a conexão com recursos de infra ficam nos repositories.
```
	- src
		- controllers
		- services
		- repositories
```

## O inicializador handler.ts
O framework Serverless não possui suporte nativo a OOP, por isso é necessário utilizar o arquivo `handler.ts` para gerenciar manualmente as instâncias de classes e injeções de dependências do projeto.
Este arquivo atua como um ponto focal da aplicação, inicializando os todos os endpoints.

```typescript
	...
	const shortenerController = new ShortenerController(shortenerService, responseBuilder);

	export const short = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
		return await shortenerController.short(event)
	};
```
No exemplo acima, o inicializador instancia a classe `ShortenerController` e define uma função `short()` que será utilizada como ponto de entrada pelo framework Serverless.

Também é realizada a injeção das dependências das classes `ShortenerService` e `ResponseBuilder`, estas classes também foram instanciadas no arquivo `handler.ts`.

Nas configurações do framework teremos a declaração do endpoint, apontando para a função `short()`:
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

## Deploy
Para realizar o deploy da aplicação na AWS, basta utilizar o comando `serverless deploy`.

As (credenciais AWS)[https://serverless.com/framework/docs/providers/aws/guide/credentials/] precisam estar configuradas corretamente no seu ambiente de desenvolvimento local para o deploy funcionar.

Para mais informações sobre deploy, consulte na [documentação do Framework Serverless](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy).


## Autor
Alessandro Rodrigues dos Santos
* [GitHub](https://github.com/alessandrorods)
* [LinkedIn](https://linkedin.com/in/alessandrorods)