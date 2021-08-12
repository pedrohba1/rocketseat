# RocketShoes mobile

## Tabela de conteúdos

- [Sobre](#about)
- [Setup](#getting_started)

## Sobre <a name = "about"></a>

O objetivo desse projeto era utilizar a arquitetura flux e refazer a interface web do RocketShoes em mobile usando react-native. Prints de exemplo:

![img](https://github.com/pedrohba1/RocketShoes/blob/master/readme_stuff/image1.png)
![img](https://github.com/pedrohba1/RocketShoes/blob/master/readme_stuff/image2.png)
![img](https://github.com/pedrohba1/RocketShoes/blob/master/readme_stuff/image3.png)

## Setup <a name = "getting_started"></a>

Execute o json server com `json-server server.json -p 3333 -w`

Execute `adb reverse tcp:3333 tcp:3333` para a api localhost ser acessada pelo celular ou emulador.

Execute `adb reverse tcp:9090 tcp:9090` para que o reactotron possa ouvir a porta e depurar a aplicação.
