const walk = function (ast, {enter,leave}){
    if(ast && typeof ast === 'object'){
        enter(ast)
        for (var i in ast){
            walk(ast[i],{enter,leave})
        }
        leave(ast)
    }
}
module.exports = walk
