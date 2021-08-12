<p align="center">
  <a href="" rel="noopener">
 <img src="https://github.com/pedrohba1/bootcamp-gostack-desafio-02/blob/master/readme%20stuff/logo.png" alt="Project logo"></a>
</p>

<h3 align="center">Backend da aplicação do fastfeet</h3>

<div align="center">


[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Esse é o backend da aplicação é o trabalho final do curso goStack, ofertado pela RocketSeat.
    <br>
</p>

## 📝 Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Usage](#usage)
-   [Built Using](#built_using)

## 🧐 About <a name = "about"></a>

Esse projeto é o backend da aplicação do fastFeet, aqui contém todas as instruções de como iniciar o projeto.

## 🏁 Getting Started <a name = "getting_started"></a>

Apenas `yarn install`para instalar todas as dependências do projeto assim que cloná-lo.

Em seguida, você precisa usar o Docker para inicializar um container com postgres e um com mongo, da seguinte maneira:

```
#postgres
docker run --name fastFeetPostgres -e  POSTGRES_USER=fastFeet -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
#mongo
docker run --name fastFeetMongo -p 27017:27017 -d -t mongo
#redis
docker run --name fastFeetRedis -p 6379:6379 -d -t redis:alpine
```

Veja que no windows eu tive que mudar a porta de listening para 5433.

Se você já fez esse container antes, você pode startar ele com `docker start fastFeetDatabase`

OBS: Eu recomendo usar o postbird para visualizar o postgres, só precisa colocar o usuário como postgres e a senha que foi definida como docker no comando acima que cria o container do postgres.

O postbird não precisa ser usado para criar tabelas. Isso é lidado pela própria aplicação usando o sequelize.

O arquivo .sequelizerc tem os caminhos de todos os diretórios importantes para o sequelize.

Depois que você criar as tabelas com `yarn sequelize migration:create --name=create-recipient` você pode acrescentar elas to container com `yarn sequelize db:migrate`.
Também é possível remover migrations com `yarn db:migrate:undo:all`
Depois de feitas as migrations, é preciso adicionar as seeds, com `yarn sequelize db:seed:all`

As seesds são de entregadores, pacotes e recipientes. Tem 100 de cada um, gerados aleatoriamente, exceto no caso de pacotes, que foram gerados 400. Cada Entregador ficou responsável nesse caso por 4 pacotes.

Existe arquivo de debug na pasta .vscode
Para utilizar opção de debug, execute o comando:

```
yarn dev:debug
```

Também tem um comando que deve ser executado caso você queira testar o envio de emails. Depoois de configurar o mailtrap.io no `.env`, execute o comando `yarn queue` para permitir a execução da rotinha que ficará responsável pelo envio de emails.

## 🎈 Usage <a name="usage"></a>

Você pode usar o arquivo do insomnia que eu deixei na pasta backend para conseguir testar algumas rotas.


## ⛏️ Built Using <a name = "built_using"></a>

-   [Postgres](https://www.postgresql.org) - Banco de dados
-   [Express](https://expressjs.com/) - framework de servidor
-   [NodeJs](https://nodejs.org/en/) - Ambiente de servidor
-   [Docker](https://www.docker.com/) - Cria containers para o backend.
-   [MongoDB](https://www.mongodb.com/) - Banco de dados não relacional

