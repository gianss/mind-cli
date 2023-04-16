
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')


module.exports = (name) => {

  if (!fs.existsSync(name)) {
    fs.mkdirSync(name, { recursive: true })
    console.log(`✅ Created directory: ${name}`)
  } else {
    console.log(`The directory already exists`)
    process.exit(1)
  }

  process.chdir(name)

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
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ Created ${dir}`)
  }

  const createFiles = (dir, fileName, content = '') => {
    fs.writeFileSync(path.join(dir, fileName), content)
    console.log(`✅ Created ${path.join(dir, fileName)}`)
  }

  if (!fs.existsSync('package.json')) {
    if (fs.existsSync('src')) {
      execSync('rm -r src')
    }
    createFiles('.', 'package.json', JSON.stringify(packageJson, null, 2))
  } else {
    console.log('Projeto já iniciado, se deseja recria-lo do zero. Apague o package.json e rode novamente o commando. Isso irá apagar todas as alterações feitas')
    process.exit(1)
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
  createFiles('.', 'tsconfig.json', JSON.stringify(tsConfig, null, 2))

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
  createFiles('.', 'tsconfig.prod.json', JSON.stringify(tsConfigProd, null, 2))


  const husky = {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
  createFiles('.', '.huskyrc.json', JSON.stringify(husky, null, 2))

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
  createFiles('.', '.eslintrc.json', JSON.stringify(esLint, null, 2))


  const lintStaged = {
    "*.ts": [
      "eslint 'src/**' --fix",
      "npm run test:staged",
      "git add"
    ]
  }
  createFiles('.', '.lintstagedrc.json', JSON.stringify(lintStaged, null, 2))

  const esLintIgnore = `node_modules
dist`
  createFiles('.', '.eslintignore', esLintIgnore)

  const nodemon = {
    "verbose": true,
    "watch": ["src/**/*.ts", "src/**/*.json"],
    "ext": "ts js json",
    "ignore": ["src/**/*.spec.ts"],
    "exec": "ts-node src/index.ts"
  }
  createFiles('.', 'nodemon.json', JSON.stringify(nodemon, null, 2))

  const jestFull = `const config = require('./jest.config')
config.testMatch = ['**/*.*.ts']
module.exports = config`
  createFiles('.', 'jest-full-config.js', jestFull)

  const jestIntegration = `const config = require('./jest.config')
config.testMatch = ['**/*.test.ts']
module.exports = config`
  createFiles('.', 'jest-integration-config.ts', jestIntegration)

  const jestUnit = `const config = require('./jest.config')
config.testMatch = ['**/*.spec.ts']
module.exports = config\n`
  createFiles('.', 'jest-full-config.js', jestUnit)

  const jest = `module.exports = {
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts'
    ],\n
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    testEnvironment: 'node',
    transform: {
      '.+\\.ts$': 'ts-jest'
    }
  }`
  createFiles('.', 'jest.config.js', jest)

  const folderStructure = [
    'src/db',
    'src/controllers',
    'src/interfaces',
    'src/routes',
    'src/routes/users',
    'src/utils',
    'src/helpers'
  ]


  // Cria a estrutura de pastas
  folderStructure.forEach((folder) => {
    createFolders(folder)
  })

  // Cria o arquivo 'src/index.ts'
  const indexContent = `
import express from 'express'
import routes from './routes'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors)
app.use(routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
 console.log(\`🚀 Server running on port \${port}\`)
})

export default app
`

  createFiles('src', 'index.ts', indexContent)

  // Cria o arquivo 'src/routes/index.ts'
  const routesIndexContent = `import fs from 'fs'
import { Router } from 'express'
const routes = Router()
fs.readdirSync('./src/routes').forEach(async (file) => {
  const fileName = file.split('.')[0] // Remove a extensão do arquivo
  const [routeName, spec] = fileName.split('/')
  if (fileName === 'index') return // Separa o nome da rotaz do diretório
  if (spec === 'spec') return
  const route = await import(\`./\${file}/\${fileName}\`)
  routes.use(\`/\${routeName}\`, route.default)
})
export default routes
`
  createFiles('src/routes', 'index.ts', routesIndexContent)


  // Cria o arquivo de rota 'src/routes/user.js'
  const userRouteContent = `import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.send('GET /user')
})
  
export default router
`
  createFiles('src/routes/users', 'users.ts', userRouteContent)


  // Cria o arquivo de rota 'src/routes/user.spec.ts'
  const userRouteSpecContent = `
import request from 'supertest'
import app from '../../index'
import userRouter from './users'
  
describe('User routes', () => {
  describe('GET /', () => {
    it('should respond with status code 200', async () => {
      const res = await request(app.use(userRouter)).get('/')
      expect(res.statusCode).toBe(200)
    })
  })
})
`
  createFiles('src/routes/users', 'users.spec.ts', userRouteSpecContent)

  console.log('Instalando dependências... Aguarde')
  execSync('npm install')
  execSync('npm update')

}