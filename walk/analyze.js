const Scope = require('./scope')
const walk = require("./walk");

const root = new Scope()
let scope = root
stateTypes = ['BinaryExpression','UpdateExpression']

module.exports = function analyze(ast){
    walk(ast, {
        enter: (node) => {
            if(node.type === 'Identifier'){
                scope.add(node.name)
            }
            if (node.body) {
                const child = new Scope({parent:scope})
                scope = child
            }
        }, leave: (node) => {
            if (node.type === 'Litera') {
                scope = scope.parent
            }
        }
    })
    return  scope
}
