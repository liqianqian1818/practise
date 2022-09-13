describe('analyze',() => {
    test('analyze',() => {
        const analyze = require('../analyze')

        const acorn = require('acorn');
        const fs = require('fs');
        // const code = fs.readFileSync("./source.js").toString();
        const code = `
            const a = 2
            if(true){
                const d = 9
            }
            function fn1(){
                const b = 5
                function fn2(){
                    const g = 9
                }
            }
            for(let i = 0; i<8;i++){
                const ww = 8
            }
        `
        const ast = acorn.parse(code,{ecmaVersion:'7'})
        const scope = analyze(ast)
        console.log('-----',JSON.stringify(scope,null,4))
        // expect(scope.contains(`a`)).toEqual(true)
        // expect(scope.findDefiningScope(`a`)).toBe(scope)

        // expect(scope.contains(`b`)).toEqual(true)
        // expect(scope.findDefiningScope(`b`)).toBe(scope)
    })
})
