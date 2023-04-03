O Mind Framework é um CLI para criar arquivos de diferentes tipos a partir de comandos específicos. Você pode usar o Mind para criar classes, middlewares, rotas, controladores e projetos novos. Abaixo estão listados os comandos disponíveis:

make:class <name>: Cria uma nova classe com o nome especificado. Use a opção -c ou --constructor para adicionar um construtor à classe.

make:middleware <name>: Cria um novo middleware com o nome especificado.

make:db <name>: Cria uma nova classe de banco de dados com o nome especificado. Use a opção -c ou --constructor para adicionar um construtor à classe.

make:router <name>: Cria um novo arquivo de rotas com o nome especificado.

make:controller <name> <method>: Cria um novo controlador com o nome especificado e um método especificado. Use a opção -c ou --constructor para adicionar um construtor à classe.

new <name>: Cria um novo projeto com o nome especificado.

Você pode executar cada comando digitando mind <comando>. Por exemplo, para criar uma nova classe chamada MyClass, digite mind make:class MyClass.