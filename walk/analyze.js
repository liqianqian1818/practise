const Scope = require('./scope')
const walk = require("./walk");

// const acorn = require('acorn');
// const fs = require('fs');
// const code = fs.readFileSync("./source.js").toString();
// const ast = acorn.parse(code, {ecmaVersion: '7'})
const statements = []
const scopeList = []
module.exports = function analyze(ast){
    walk(ast, {
        enter: (node) => {
            if(node?.type === 'VariableDeclaration'){
                const scope = new Scope({
                    parent: statements[statements.length-1]
                })
                // console.log(`${statements.join('')}${node.declarations.map(it => it.id.name).join(',')}`)
                node.declarations.map(it => scope.add(it.id.name))
                scopeList.push(scope)
            }
            if(node?.type === 'FunctionDeclaration' || node?.type === 'IfStatement' || node?.type === 'ForStatement'){
                const scope = new Scope({
                    parent:statements[statements.length-1]
                })
                scope.add(node.id?.name)
                statements.push(scope)
            }
            if(node?.type === 'ArrowFunctionExpression'){
                const scope = new Scope({
                    parent:statements[statements.length-1]
                })
            }
        }, leave: (node) => {
            if(node?.type === 'FunctionDeclaration' || node?.type === 'IfStatement' || node?.type === 'ForStatement'){
                statements.pop()
            }
        }
    })
    return scopeList
}
