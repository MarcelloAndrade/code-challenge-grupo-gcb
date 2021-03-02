yarn init -y

yarn add express (micro framework para criaçao de rotas e middleware)  
yarn add @types/express -D  

yarn add typescript -D	(superconjunto de JavaScript adiciona tipagem)  

yarn tsc --init (inicia o type script na aplicaçao)  
yarn add ts-node-dev -D (fica escutando os arquivos alterados para compilar)

yarn add typeorm reflect-metadata  
yarn add mysql					 "^2.18.1",

### New migration
yarn typeorm migration:create -n CreateDoctors  
yarn typeorm migration:create -n CreateSpecialization
yarn typeorm migration:create -n CreateDoctorsSpecialization

### Run migration
yarn typeorm migration:run
yarn typeorm migration:revert
