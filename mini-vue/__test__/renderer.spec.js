import { createRenderer, createAppAPI } from '../src/renderer'
import {createApp} from "../src";
import nodeOptions from '../src/runtime-dom'
describe('renderer',()=>{
    test('renderer',()=>{
        const renderer = createRenderer({
            // appendChild
        })
        // renderer.render
        // renderer.createApp
        expect(typeof renderer.render).toBe('function')
        expect(typeof renderer.createApp).toBe('function')
    })

    test('',()=>{
        const mock = jest.fn()
        const createApp = createAppAPI(mock)
        createApp().mount()
        expect(typeof createApp).toBe('function')
        expect(mock).toBeCalled() // createApp 挂载，mock被调用
    })

    test('',()=>{
        const renderer = createRenderer(nodeOptions)
        const container = document.createElement('div')
        renderer.createApp({
            data() {
                return {
                    title: 'hello, mini-vue!'
                }
            },
            render() {
                const node = document.createTextNode(this.title)
                return node
            }
        }).mount(container)
        expect(container.innerHTML).toBe('hello, mini-vue!')
    })
})