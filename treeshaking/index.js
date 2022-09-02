const fs = require('fs');
const MagicString = require('magic-string');
const code = fs.readFileSync("./source.js").toString();
// console.log({code});
// 分析
const m = new MagicString(code)
// console.log({m})

const acorn = require('acorn');
// console.log({acorn: acorn.parse(code, {ecmaVersion:'7'})});

const ast = acorn.parse(code,{ecmaVersion:'7'})

const variableDeclarator = []
const expressionStatement = []
const declarations = {}
const statements = []
// 拼装
ast.body.map((node, index)=> {
    // console.log(node.type)
    // console.log(index,m.snip(node.start,node.end).toString())
    if(node.type === 'VariableDeclaration'){
        variableDeclarator.push(node.declarations[0].id.name)
        declarations[node.declarations[0].id.name]=node
    }else if(node.type === 'ExpressionStatement'){
        // expressionStatement.push(node.expression.callee.name)
        expressionStatement.push(node)
    }
})
// console.log(variableDeclarator,expressionStatement)

expressionStatement.map((node)=>{
    statements.push(declarations[node.expression.callee.name])
    statements.push(node)
})

// 输出
console.log('----output----')
statements.map((node, index) => {
    console.log(index, m.snip(node.start,node.end).toString())
})
