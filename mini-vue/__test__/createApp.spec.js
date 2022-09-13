import { createApp } from '../src/index'

describe('createApp',()=>{
    test('run createApp() should renturn App instance',()=>{
        const app = createApp()
        // app 是个object， 里面有一个mount方法
        expect(typeof app).toBe('object')
        ecpect(typeof app.mount).toBe('function')
    })

    test('this 指向',()=>{
        const div = document.createElement('div')
        createApp({
            data(){
                return {
                    title: 'hello'
                }
            },
            render(){
                const el = document.createElement('div')
                el.innerText = this.title
                return el
            }
        }).mount(div)
        console.log('*****',div.childNodes[0].innerText)
        expect(div.childNodes[0].innerText).toBe('hello')

    })
    test('el = #app',()=>{
        // const div = document.createElement('div')
        // div.id = 'app'
        // document.body.appendChild(div)
        createApp({
            data(){
                return {
                    title: 'hello'
                }
            },
            render(){
                const el = document.createElement('div')
                el.innerText = this.title
                return el
            }
        }).mount('#app')
        // console.log('*****',div.childNodes[0].innerText)
        expect(div.childNodes[0].innerText).toBe('hello')
    })
    test('setup',()=>{
        // const div = document.createElement('div')
        // div.id = 'app'
        // document.body.appendChild(div)
        createApp({
            setup(){
                return {
                    title: 'hello'
                }
            },
            render(){
                const el = document.createElement('div')
                el.innerText = this.title
                return el
            }
        }).mount('#app')
        console.log('*****',div.childNodes[0].innerText)
        expect(div.childNodes[0].innerText).toBe('hello')
    })
})