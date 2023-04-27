const fs = require('fs')
const path = require('path')

module.exports = (name, withConstructor) => {
    const configFile = path.join(process.cwd(), 'mind.json')
    if (!fs.existsSync(configFile)) {
        console.log(`Arquivo de configuração não encontrado`)
        return
    }
    name = name.toLowerCase()
    const nameAlterado = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const interfaceCode = `export class ${nameAlterado}ServiceDB {\n${withConstructor ? `\n  constructor() {\n\n  }\n\n` : ''}}`
    const dir = path.join(process.cwd(), 'src', 'db')
    const fileName = `${name}-service-db.ts`

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
        console.log(`✅ Created directory: ${dir}`)
    }

    if (!fs.existsSync(path.join(dir, fileName))) {
        fs.writeFileSync(path.join(dir, fileName), interfaceCode)
        console.log(`✅ Created file: ${path.join(dir, fileName)}`)
    } else {
        console.log('O arquivo já existe')
    }

}
