#!/usr/bin/env node


const { program } = require('commander')

program
    .command('make:class <caminho> <name>')
    .option('-c, --constructor', 'Include constructor method', false)
    .description('Create a new class')
    .action((caminho, name, options) => {
        const createClass = require('./commands/class/create')
        createClass(name, caminho, options.constructor)
    })

program
    .command('make:middleware <name>')
    .description('Create a new class')
    .action((name, options) => {
        const createClass = require('./commands/middleware/create')
        createClass(name, options.constructor)
    })


program
    .command('make:db <name>')
    .option('-c, --constructor', 'Include constructor method', false)
    .action((name, options) => {
        const createClass = require('./commands/db/create')
        createClass(name, options.constructor)
    })

program
    .command('make:router <name>')
    .option('-c, --constructor', 'Include constructor method', false)
    .action((name, options) => {
        const createClass = require('./commands/routes/create')
        createClass(name, options.constructor)
    })

program
    .command('make:interface <name>')
    .action((name, options) => {
        const createClass = require('./commands/interface/create')
        createClass(name, options.constructor)
    })

program
    .command('make:controller <name> <method>')
    .option('-c, --constructor')
    .description('Create a new controller')
    .action((name, method, options) => {
        const createController = require('./commands/controller/create')
        createController(name, method, options.constructor)
    })

program
    .command('new <name>')
    .description('Create a new project')
    .action((name) => {
        const createProject = require('./commands/new-project/create')
        createProject(name)
    })

program.parse(process.argv)
