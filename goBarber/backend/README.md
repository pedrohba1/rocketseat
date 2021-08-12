## 📝 Tabela de conteúdos

- [Sobre](#about)
- [Setup](#getting_started)
- [Pré-requisitos](#requisites)

## 🧐 About <a name = "about"></a>

Projeto do goBarber da RocketSeat.

## 🏁 Setup <a name = "getting_started"></a>

É preciso criar containers no docker de todas os bancos de dados e do redis antes.
A maneira como eu criei foi a seguinte:

```
#postgres
docker run --name goBarberPostgres -e  POSTGRES_USER=goBarber -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
#mongo
docker run --name goBarberMongo -p 27017:27017 -d -t mongo
#redis
docker run --name goBarberRedis -p 6379:6379 -d -t redis:alpine
```

depois, se o seu docker estiver off, você pode startar esses containers com:

```
docker start goBarberPostgres
docker start goBarberMongo
docker start goBarberRedis
```

depois que você criar as tabelas com `yarn sequelize migration:create --name=create-recipient` você pode acrescentar elas to container com `yarn sequelize db:migrate`. Também é possível remover migrations com yarn `db:migrate:undo:all`

Feitas as migrations, é preciso adicionar as seeds, com `yarn sequelize db:seed:all`


### Pré-requisitos  <a name = "requisites"></a>
Você precisa ter o docker instalado e configurado na sua máquina.




