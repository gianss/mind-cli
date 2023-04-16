# Mind Framework

O Mind Framework é uma ferramenta de linha de comando (CLI) que permite criar arquivos de diferentes tipos por meio de comandos específicos. Com o Mind, é possível criar classes, middlewares, rotas, controladores e projetos novos. Abaixo estão os comandos disponíveis:


## Instalação

```console
npm i mindhouse-cli -g
```

## Comandos

Para utilizar os comandos do CLI, execute os comandos abaixo:

- `mind new <name>`: cria um novo projeto com o nome especificado.
- `mind make:class <caminho> <name>`: cria uma nova classe com o nome especificado. Para adicionar um construtor à classe, utilize a opção `-c` ou `--constructor`.
- `mind make:middleware <name>`: cria um novo middleware com o nome especificado.
- `mind make:db <name>`: cria uma nova classe de banco de dados com o nome especificado. Para adicionar um construtor à classe, utilize a opção `-c` ou `--constructor`.
- `mind make:router <name>`: cria um novo arquivo de rotas com o nome especificado.
- `mind make:controller <name> <method>`: cria um novo controlador com o nome e o método especificados. Para adicionar um construtor à classe, utilize a opção `-c` ou `--constructor`.

## Execução de comandos

Para executar um comando, basta digitar o comando desejado. Por exemplo, para criar uma nova classe chamada `MyClass`, digite `mind make:class MyClass`.
