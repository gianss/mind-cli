const fs = require('fs');
const path = require('path');

module.exports = (name) => {
    name = name.toLowerCase();
    metodo = metodo.toLowerCase();
    const nameAlterado = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const interfaceCode = `
    import {Router} from 'express'
    const router = Router();
    
    router.get('/', (req, res) => {
      res.send('GET /${name}');
    });
    
    module.exports = router;
    `;
    const dir = path.join(process.cwd(), 'src', 'routes', name);
    const fileName = `${name}.ts`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }

    if (!fs.existsSync(path.join(dir, fileName))) {
        fs.writeFileSync(path.join(dir, fileName), interfaceCode);
        console.log(`✅ Created file: ${path.join(dir, fileName)}`);
    } else {
        console.log('O arquivo já existe')
    }

};
