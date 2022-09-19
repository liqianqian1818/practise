import {createApp} from '../src/index'
// import { reactive } from '../src/reactive';

describe('createApp should work', () => {
    const div = document.createElement('div')
    div.id = 'app'
    document.body.appendChild(div)
    test('run createApp() should return App instance', () => {
        const app = createApp({})
        expect(typeof app).toBe('object')
        expect(typeof app.mount).toBe('function')
    });

    test('mount() should render text node to host', () => {
        const div = document.createElement('div')
        createApp({
            data() {
                return {
                    title: 'hello'
                }
            },
            render() {
                const el = document.createElement('div')
                el.innerText = this.title
                return el
            }
        }).mount(div)
        expect(div.childNodes[0].innerText).toBe('hello')
    });

    test('mount() can receive a selector ', () => {
        createApp({
            data() {
                return {
                    title: 'hello'
                }
            } ,
            render() {
                const el = document.createElement('div')
                el.innerText = this.title
                return el
            }
        }).mount('#app')

        expect(document.body.children[0].id).toBe('app')
    });

    test('should support setup option', () => {
        createApp({
            setup() {
                return {
                    title: 'hello'
                }
            },
            render() {
                const el = document.createElement('div')
                el.innerText = this.title
                return el
            }
        }).mount('#app')

        expect(document.body.children[0].id).toBe('app')
    });

    test('should support setup option and data exist at the same time', () => {
        let container = document.createElement('div')
        createApp({
            data() {
                return {
                    title2: 'mini-vue, hello'
                }
            },
            setup() {
                return {
                    title1: 'hello, mini-vue!'
                }
            },
            render() {
                const el = document.createElement('div')
                el.innerText = this.title
                return el
            }
        }).mount('#app')
        expect(document.body.children[0].id).toBe('app')
    });


    test('mount() should render text node to host', () => {
        const container = document.createElement('div')
        createApp({
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
    });
});
