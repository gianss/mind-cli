const fs = require('fs')
const path = require('path')

module.exports = (name) => {
    if (!path.join(process.cwd(), 'mind.json')) {
        console.log(`Arquivo de configuração não encontrado`)
        return
    }
    name = name.toLowerCase()
    const nameAlterado = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const interfaceCode = `export interface ${nameAlterado}Interface {}`
    const dir = path.join(process.cwd(), 'src', 'interfaces')


    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
        console.log(`✅ Created directory: ${dir}`)
    }

    const fileName = `${name}.ts`
    const filePath = path.join(dir, fileName)
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, interfaceCode)
        console.log(`✅ Created file: ${filePath}`)
    } else {
        console.log('O arquivo já existe')
    }
}
