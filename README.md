# DioWebContainer
Projeto didatico utilizando Docker Compose para executar uma aplicação HTML em um Container Apache

Este é um projeto sugerido pela plataforma DIO chamado `Criando um Container de uma Aplicação WEB`.

A idéia sugerida é utiliza o docker compose para rodar uma aplicação web simples utilizando como 
base o container httpd oficial do apache.

Para fins de demonstração foi incluido um simples `snake game` utilizando apenas js+html+css, que já havia 
realizado anteriormente.

Esta aplicação está disponível na web pelo link [https://dio-snake-game-seven.vercel.app/](https://dio-snake-game-seven.vercel.app/)

Para rodar a aplicação localmente é preciso primeiro clonar o repositório localmente e 
ter o Docker instalado localmente e com o docker-daemon rodando.
A seguir é preciso no terminal ir até a pasta onde o projeto foi clonado e digitar o comando

``` docker compose up ``` 

Este comando irá baixar a imagem do servidor apache se não já houver uma localmente e iniciar o servidor.
Com o servidor iniciado será possível em qualquer browser visitar o endereço

``` http://localhost```

e dando tudo certo você poderá ver uma simples implementação do famoso jogo da cobrinha.

Para parar o servidor volte ao terminal e presione `control+c`, também conhecido como `^-C`
Para remover o container da memória digite o comando

```
docker container rm my-apache-app
```

Para remover a imagem do servidor apache da memória digite o comando

```
docker image rm httpd
```



