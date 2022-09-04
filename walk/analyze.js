const Scope = require('./scope')
const walk = require("./walk");
module.exports = function analyze(ast){
    // ast 是语法树
    // 输出是 分析scope
    // tree shaking 需要作用域的数据
    const root = new Scope()
    ast = {
        "type": "Program",
        "start": 0,
        "end": 54,
        "body": [
            {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 19,
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "start": 6,
                        "end": 11,
                        "id": {
                            "type": "Identifier",
                            "start": 6,
                            "end": 7,
                            "name": "a"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 10,
                            "end": 11,
                            "value": 0,
                            "raw": "0"
                        }
                    },
                    {
                        "type": "VariableDeclarator",
                        "start": 13,
                        "end": 18,
                        "id": {
                            "type": "Identifier",
                            "start": 13,
                            "end": 14,
                            "name": "b"
                        },
                        "init": {
                            "type": "Literal",
                            "start": 17,
                            "end": 18,
                            "value": 1,
                            "raw": "1"
                        }
                    }
                ],
                "kind": "const"
            },
            {
                "type": "IfStatement",
                "start": 20,
                "end": 54,
                "test": {
                    "type": "Literal",
                    "start": 24,
                    "end": 28,
                    "value": true,
                    "raw": "true"
                },
                "consequent": {
                    "type": "BlockStatement",
                    "start": 30,
                    "end": 54,
                    "body": [
                        {
                            "type": "VariableDeclaration",
                            "start": 36,
                            "end": 52,
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "start": 42,
                                    "end": 51,
                                    "id": {
                                        "type": "Identifier",
                                        "start": 42,
                                        "end": 43,
                                        "name": "c"
                                    },
                                    "init": {
                                        "type": "Literal",
                                        "start": 46,
                                        "end": 51,
                                        "value": "123",
                                        "raw": "'123'"
                                    }
                                }
                            ],
                            "kind": "const"
                        }
                    ]
                },
                "alternate": null
            }
        ],
        "sourceType": "module"
    }
    walk(ast, { enter: (node) => {

        }, leave: (node) => {
            if(node.type === 'Identifier'){
                root.add(node.name)
            }
            console.log('-----------',node)
            if (node.type === 'FunctionDeclaration') {
                new Scope({parent: root})
            }
        }
    })
    return root
}