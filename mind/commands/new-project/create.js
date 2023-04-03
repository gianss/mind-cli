
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');


module.exports = (name) => {

  if (!fs.existsSync(name)) {
    fs.mkdirSync(name, { recursive: true });
    console.log(`✅ Created directory: ${name}`);
  } else {
    console.log(`The directory already exists`);
    process.exit(1);
  }

  process.chdir(name);

  const packageJson = {
    "name": name,
    "version": "1.0.0",
    "description": "",
    "main": "src/index.ts",
    "scripts": {
      "start": "sucrase-node src/index.ts",
      "start:prod": "node dist/src/index.js",
      "build": "tsc --project tsconfig.prod.json",
      "start:dev": "nodemon",
      "test": "jest --watchAll --noStackTrace --passWithNoTests --runInBand",
      "test:full": "npm test -- -c jest-full-config.js --silent",
      "test:unit": "npm test -- -c jest-unit-config.js",
      "test:integration": "npm test -- -c jest-integration-config.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "@types/bcrypt": "^5.0.0",
      "@types/express": "^4.17.13",
      "@types/faker": "^5.5.9",
      "@types/jest": "^27.0.1",
      "@types/jsonwebtoken": "^8.5.6",
      "@types/multer": "^1.4.7",
      "@types/node": "^18.11.18",
      "@types/supertest": "^2.0.11",
      "@types/validator": "^13.6.3",
      "@typescript-eslint/eslint-plugin": "^4.26.0",
      "eslint": "^7.28.0",
      "eslint-config-standard-with-typescript": "^20.0.0",
      "eslint-plugin-import": "^2.23.4",
      "eslint-plugin-node": "^11.1.0",
      "eslint-plugin-promise": "^4.3.1",
      "eslint-plugin-standard": "^4.1.0",
      "git-commit-msg-linter": "^3.1.0",
      "husky": "^7.0.1",
      "jest": "^27.0.6",
      "lint-staged": "^11.1.1",
      "mock-knex": "^0.4.10",
      "nodemon": "^2.0.15",
      "sucrase": "^3.20.1",
      "supertest": "^6.1.6",
      "ts-jest": "^27.0.4",
      "typescript": "^4.3.2"
    },
    "dependencies": {
      "@types/swagger-ui-express": "^4.1.3",
      "axios": "^1.1.3",
      "bcrypt": "^5.0.1",
      "cors": "^2.8.5",
      "crypto-js": "^4.1.1",
      "date-fns": "^2.28.0",
      "dotenv": "^10.0.0",
      "express": "^4.17.1",
      "fast-glob": "^3.2.7",
      "fs": "^0.0.1-security",
      "handy-storage": "^2.1.6",
      "jsonwebtoken": "^8.5.1",
      "knex": "^0.95.15",
      "mysql2": "^2.3.3",
      "swagger-ui-express": "^4.3.0",
      "ts-node": "^10.4.0",
      "validator": "^13.6.0"
    }
  }

  const createFolders = (dir) => {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created ${dir}`);
  };

  const createFiles = (dir, fileName, content = '') => {
    fs.writeFileSync(path.join(dir, fileName), content);
    console.log(`✅ Created ${path.join(dir, fileName)}`);
  };

  if (!fs.existsSync('package.json')) {
    if (fs.existsSync('src')) {
      execSync('rm -r src');
    }
    createFiles('.', 'package.json', JSON.stringify(packageJson, null, 2));
  } else {
    console.log('Projeto já iniciado, se deseja recria-lo do zero. Apague o package.json e rode novamente o commando. Isso irá apagar todas as alterações feitas')
    process.exit(1);
  }


  const tsConfig = {
    "compilerOptions": {
      "module": "commonjs",
      "outDir": "dist",
      "target": "es2018",
      "esModuleInterop": true,
      "allowJs": true,
      "resolveJsonModule": true
    },
    "exclude": [
      "dist",
      "node_modules"
    ]
  }
  createFiles('.', 'config.json', JSON.stringify(tsConfig, null, 2));

  const tsConfigProd = {
    "compilerOptions": {
      "module": "commonjs",
      "outDir": "dist",
      "target": "es2018",
      "esModuleInterop": true,
      "allowJs": true,
      "resolveJsonModule": true
    },
    "exclude": [
      "dist",
      "node_modules",
      "src/**/*.spec.ts"
    ]
  }
  createFiles('.', 'config.prod.json', JSON.stringify(tsConfigProd, null, 2));


  const husky = {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
  createFiles('.', '.huskyrc.json', JSON.stringify(husky, null, 2));

  const esLint = {
    "extends": "standard-with-typescript",
    "parserOptions": {
      "project": "./tsconfig.json"
    },
    "rules": {
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/method-signature-style": "off",
      "@typescript-eslint/indent": "off",
      "no-tabs": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/space-before-function-paren": "off"
    }
  }
  createFiles('.', '.eslintrc.json', JSON.stringify(esLint, null, 2));


  const lintStaged = {
    "*.ts": [
      "eslint 'src/**' --fix",
      "npm run test:staged",
      "git add"
    ]
  }
  createFiles('.', '.lintstagedrc.json', JSON.stringify(lintStaged, null, 2));

  const esLintIgnore = `node_modules
dist`
  createFiles('.', '.eslintignore', esLintIgnore);

  const nodemon = {
    "verbose": true,
    "watch": ["src/**/*.ts", "src/**/*.json"],
    "ext": "ts js json",
    "ignore": ["src/**/*.spec.ts"],
    "exec": "ts-node src/index.ts"
  }
  createFiles('.', 'nodemon.json', JSON.stringify(nodemon, null, 2));

  const jestFull = `const config = require('./jest.config')\n
config.testMatch = ['**/*.*.ts']\n
module.exports = config\n`
  createFiles('.', 'jest-full-config.js', jestFull);

  const jestIntegration = `const config = require('./jest.config')\n
config.testMatch = ['**/*.test.ts']\n
module.exports = config\n`
  createFiles('.', 'jest-integration-config.ts', jestIntegration);

  const jestUnit = `const config = require('./jest.config')\n
config.testMatch = ['**/*.spec.ts']\n
module.exports = config\n`
  createFiles('.', 'jest-full-config.js', jestUnit);

  const jest = `module.exports = {\n
    collectCoverageFrom: [\n
      '<rootDir>/src/**/*.ts'\n
    ],\n
    coverageDirectory: 'coverage',\n
    coverageProvider: 'babel',\n
    testEnvironment: 'node',\n
    transform: {\n
      '.+\\.ts$': 'ts-jest'\n
    }\n
  }\n`
  createFiles('.', 'jest.config.js', jest);

  const folderStructure = [
    'src/db',
    'src/controllers',
    'src/interfaces',
    'src/routes',
    'src/routes/users',
    'src/utils',
    'src/helpers'
  ];


  // Cria a estrutura de pastas
  folderStructure.forEach((folder) => {
    createFolders(folder);
  });

  // Cria o arquivo 'src/index.ts'
  const indexContent = `
  import express from 'express';
  const app = express();
  import routes from './routes';
  
  // Adiciona as rotas ao aplicativo
  routes(app);
  
  // Inicia o servidor
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(\`🚀 Server running on port \${port}\`);
  });
  `;

  createFiles('src', 'index.ts', indexContent);

  // Cria o arquivo 'src/routes/index.ts'
  const routesIndexContent = `
  import fs from 'fs'
  import path from 'path'
  
  module.exports = (app) => {
    const routesDir = path.join(__dirname, '.');
    // Importa automaticamente todos os arquivos de rota da pasta 'routes'
    fs.readdirSync(routesDir).forEach((file) => {
      const fileName = file.split('.')[0]; // Remove a extensão do arquivo
      const [routeName, spec] = fileName.split('/'); // Separa o nome da rota do diretório
      if (spec === 'spec') return; // Ignora os arquivos de teste
      const route = require(path.join(routesDir, file));
      app.use(\`/\${routeName}\`, route);
    });
  };
  `;
  createFiles('src/routes', 'index.ts', routesIndexContent);


  // Cria o arquivo de rota 'src/routes/user.js'
  const userRouteContent = `
  import {Router} from 'express'
  const router = Router();
  
  // Define as rotas para o recurso 'user'
  router.get('/', (req, res) => {
    res.send('GET /user');
  });
  
  module.exports = router;
  `;
  createFiles('src/routes/users', 'user.ts', userRouteContent);


  // Cria o arquivo de rota 'src/routes/user.spec.ts'
  const userRouteSpecContent = `
  import request from 'supertest'
  import app from '../../app'
  import userRouter from './user'
  
  describe('User routes', () => {
    describe('GET /', () => {
      it('should respond with status code 200', async () => {
        const res = await request(app.use(userRouter)).get('/')
  
        expect(res.statusCode).toBe(200)
      })
    })
  })`;
  createFiles('src/routes/users', 'user.spec.ts', userRouteSpecContent);

  console.log('Instalando dependências... Aguarde')
  execSync('npm install');

}