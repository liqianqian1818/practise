const fs = require('fs');
const MagicString = require('magic-string');
const code = fs.readFileSync("./source.js").toString();
// console.log({code});
// 分析
const m = new MagicString(code)
// console.log({m})

const acorn = require('acorn');
// console.log({acorn: acorn.parse(code, {ecmaVersion:'7'})});

const walk = require('./walk');

const ast = acorn.parse(code,{ecmaVersion:'7'})

const statements = []

walk(ast, { enter: (node) => {
        if(node.type === 'VariableDeclaration'){
            console.log(`${statements.join('')}${node.declarations.map(it => it.id.name).join(',')}`)
        }else if(node.type === 'FunctionDeclaration'){
            statements.push(`${node.id.name} => `)
        }
    }, leave: (node) => {
        if (node && node.type === 'FunctionDeclaration') {
            statements.pop()
        }
    }
})
