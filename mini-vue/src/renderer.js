

function createAppAPI(render) {
    // 工厂
    return function createApp(options={}) {
        return {
            mount(el) {
                render(options,el)
            }
        }
    }
}

// 平台的元素操作
function createRenderer ({
    querySelector,
    insert
}) {
    const render = (options, container) => {
        const { data, render, setup, } = options
        // 各平台的操作
        if (typeof container === 'string' && container.startsWith('#')) {
            const selector = container
            container = querySelector(selector)
        }
        // data 先运行一下，render 也运行，运行完了挂在 mount 的参数上
        const ctx = {}
        if (setup) {
            ctx.setup = setup()
        }
        if (data) {
            ctx.data = data()
        }
        let exposed = {}
        const proxy = new Proxy(ctx, {
            get(target, key) {
                if (target.setup && target.setup[key]) {
                    return target.setup[key]
                } else if (target.data && target.data[key]) {
                    return target.data[key]
                }
            }
        })

        const node = render.call(proxy)
        // container.appendChild(node)
        insert(node,container)
        // container.appendChild(node)
        return proxy
    }
    const createApp = createAppAPI(render)
    return {
        render,
        createApp
    }
}

export {
    createRenderer,
    createAppAPI
}