describe('analyze',() => {
    test('analyze',() => {
        const analyze = require('../analyze')

        const acorn = require('acorn');
        const fs = require('fs');
        const code = fs.readFileSync("./source.js").toString();
        const ast = acorn.parse(code,{ecmaVersion:'7'})
        const scope = analyze(ast)
        console.log('-----',scope)
        // expect(scope.contains(`a`)).toEqual(true)
        // expect(scope.findDefiningScope(`a`)).toBe(scope)

        // expect(scope.contains(`b`)).toEqual(true)
        // expect(scope.findDefiningScope(`b`)).toBe(scope)
    })
})
