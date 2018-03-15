const { lstatSync, readdirSync, writeFileSync, readFileSync } = require('fs')
const { join, resolve } = require('path')
let templates = require('./newtemplatesrc');
let getTemplate = templates.getTemplate;
let getTestTemplate = templates.getTestTemplate;

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
readdirSync(source).map(name => join(source, name)).filter(isDirectory)

var available = getDirectories('./src');

var inquirer = require('inquirer');
inquirer.prompt([
    {
        type: 'list',
        name: 'type',
        message: 'What type of indicator you want to create?',
        choices: available
    },
    {
        type : 'text', 
        name : 'name',
        message : 'What is the name of indicator (Eg:SimpleMovingAverage)'
    },
    {
        type : 'confirm', 
        name : 'createtest',
        message : 'Do you need a test file?'
    }
]).then(answers => {
    writeFileSync(resolve(__dirname, answers.type, answers.name+ '.ts'), getTemplate(answers));
    console.log(answers.createtest);
    if(answers.createtest) {
        writeFileSync(resolve(__dirname, 'test', answers.type.split('/')[1], answers.name+ '.js'), getTestTemplate(answers));
    }
});

