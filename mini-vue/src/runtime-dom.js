import { createRenderer, createAppAPI } from "./renderer";
const nodeOptions = {
    querySelector,
    insert
}
function querySelector(selector){
    return document.querySelector(selector)
}
function insert(node,container){
    container.appendChild(node)
}
export function createApp(options){
    const renderer = createRenderer((nodeOptions))
    return renderer.createApp(options)
}

