const EOF = Symbol('EOF')
function checkDec(str){
    let state = start
    for (const s of str){
        state = state(s)
    }
    state = state(EOF)

    if(state == succeed){
        return true
    }else {
        return false
    }
}

function start(c){
    if(c==='0'){
        return receivedZero
    }else if(+c>=1 && +c<=9){
        return waitingForNumber
    }else if(c ==='.'){
        return afterDot
    }else {
        return failed
    }
}

function receivedZero(c){
    if(c===EOF){
        return succeed
    }
    return failed
}

function waitingForNumber(c){
    if(c===EOF){
        return succeed
    }else if(+c >= 0 && +c <= 9){
        return waitingForNumber
    }else if(c ==='.'){
        return afterDot
    }else {
        return failed
    }
}

function afterDot(c){
    if(c===EOF){
        return succeed
    }else if(+c >= 0 && +c <= 9){
        return afterDot
    }else {
        return failed
    }
}

function succeed(){
    throw Error('illegal call')
}

function failed(){
    return failed
}

console.log(checkDec('8.9.0'))