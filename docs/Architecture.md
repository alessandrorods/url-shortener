# Arquitetura
Para atender aos requisitos de RPM e uptime do projeto, foi construída uma arquitetura baseada, principalmente em recursos Serverless, altamente escaláveis e capazes de suportar um alto número de requisições por minuto.

## Visão geral
![Diagrama geral da arquitetura](https://github.com/alessandrorods/meli-shortener-api/blob/main/docs/assets/serverless-architecture-diagram.png)

## Recursos utilizados
### Lambdas
As funções AWS Lambda são capazes de suportar um alto número de requisições a um custo muito baixo. 

A desvantagem é que em grandes aplicações o gerenciamento desses recursos na AWS pode ser complexo, já que cada endpoint da aplicação equivale a uma função Lambda, porém o uso do framework Serverless abstrai essa complexidade através do comando CLI para deploy.

*Alternativas*
Em alternativa à AWS Lambda, poderia ser utilizados vários outros recursos da AWS:
- *Cluster EC2 com Auto-Scalling Group*: dissertar...
- *AWS Elastic Container Service*: disserte...
- *Kubernetes*: disserte...

### Banco de Dados
DynamoDB é um serviço de banco de dados gerenciado que oferece suporte a altos números de requisições por minuto, com escalabilidade horizontal... 

### Cache
REDIS...
*TTL 1h*

### Observabilidade
CloudWatch + Grafana rodando em uma instância EC2

