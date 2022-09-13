import {createApp} from '../src/index'
import { reactive } from '../src/reactive';

describe('createApp should work', () => {
    test('run createApp() should return App instance', () => {
        const app = createApp({})
        expect(typeof app).toBe('object')
        expect(typeof app.mount).toBe('function')
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

    test('mount() should render element to host', () => {
        const container = document.createElement('div')
        createApp({
            data() {
                return {
                    title: 'hello, mini-vue!'
                }
            },
            render() {
                const div = document.createElement('div')
                div.textContent = this.title
                return div
            }
        }).mount(container)
        expect(container.innerHTML).toBe('<div>hello, mini-vue!</div>')
    });

    test('mount() can receive a selector ', () => {
        const container = document.createElement('div')
        container.id = 'app'
        document.body.appendChild(container)
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
        }).mount('#app')
        expect(container.innerHTML).toBe('hello, mini-vue!')
    });

    test('should support setup option', () => {
        const container = document.createElement('div')
        createApp({
            setup() {
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
                return document.createTextNode(this.title1+this.title2)
            }
        }).mount(container)
        expect(container.innerHTML).toBe('hello, mini-vue!')


        container = document.createElement('div')
        createApp({
            data() {
                return {
                    title2: 'mini-vue!'
                }
            },
            setup() {
                return {
                    title1: 'hello, '
                }
            },
            render() {
                return document.createTextNode(this.title1 + this.title2)
            }
        }).mount(container)
        expect(container.innerHTML).toBe('hello, mini-vue!')
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

    test('can update', () => {
        const container = document.createElement('div')
        const state = reactive({
            title: 'hello, mini-vue!'
        })
        createApp({
            setup() {
                return state
            },
            render() {
                return document.createTextNode(this.title)
            }
        }).mount(container)
        expect(container.innerHTML).toBe('hello, mini-vue!')
        state.title = 'mini-vue, hello!'
        expect(container.innerHTML).toBe('mini-vue, hello!')

    });
});
