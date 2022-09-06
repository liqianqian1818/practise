module.exports = class Scope{
    constructor(options={}) {
        this.names = []
        this.parent = options.parent || null
    }
    add(name){
         this.names.push(name)
    }
    contains(name){
        return !!this.findDefiningScope(name)
    }
    findDefiningScope(name){
        if(this.parent && !this.names.includes(name)){
            return this.parent.findDefiningScope(name)
        }else if(!this.parent && !this.names.includes(name)){
            return null
        }
        return this
    }
}
