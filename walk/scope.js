module.exports = class Scope{
    constructor(option={}) {
        this.names = option.names ||  []
        this.parent = option.parent || null
    }
    add(name){
         this.names.push(name)
    }
    contains(name){
        return !!this.findDefiningScope(name)
    }
    findDefiningScope(name){
        if(this.parent && !this.scopeList.includes(name)){
            return this.parent.findDefiningScope(name)
        }else if(!this.parent && !this.scopeList.includes(name)){
            return null
        }
        return this
    }
}
