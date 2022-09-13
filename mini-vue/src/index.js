export function createApp(option={}){
    return {
        mount(el){
            // el = '#app'
            if(typeof el === 'string' && el.startsWith('#')){
                // 选择器
                el = document.querySelector(el)
            }
            // setup存在时
            const ctx = {}
            if(option.setup){
                ctx.setup = option.setup()
            }
            if(option.data){
                ctx.data = option.data()
            }

            const proxy =  new Proxy(ctx,{
                get(target,key){
                    if(target['setup'][key]){
                        return target['setup'][key]
                    }else if(target['data'][key]){
                        return target['data'][key]
                    }
                }
            })
            const node = option.render.call(proxy)

            el.appendChild(node)
        }
    }
}