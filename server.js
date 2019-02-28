'use strict';

const Hapi = require("hapi");
const cuid = require("cuid");
let id = 50;
let books = require("./books.json");
let instance = require('./book.js');

let port = process.env.PORT || 3000;
let url = process.env.URL || 'localhost';


function getTopId(books) {
    let id = books.reduce((max, item) => max && max.id > item.id ? max : item.id, null);
    if (Number.isInteger(id)) {
        id += 1;
    }

    return id;
}


const server = Hapi.server({
    port: port,
    host: url,
    routes: {
        cors: true
    }
});

server.route({
    path: '/',
    method: 'GET',
    handler: () => {
        return {
            message: 'Welcom to the Todos Api!'
        }
    }
})

server.route({
    path: '/todos',
    method: 'POST',
    handler: (request, h) => {
        let { id, description } = request.payload;
        const result = {
            id: cuid(),
            description
        };

        const response = h.response(result)
            .code(201);
        return response;
    }
})

server.route({
    path: '/books',
    method: 'GET',
    handler: () => {
        return {
            books
        }
    }
})

server.route({
    path: '/books',
    method: 'POST',
    handler: (request, h) => {

        let { id, title, author, format } = request.payload;
        let topId = getTopId(books);

        let item = instance.getBook(topId, title, author, format);
        books.push(item);
        const result = {
            item
        };

        const response = h.response(result)
            .code(201);
        return response;
    }
})


const init = async () => {
    await server.start();
    console.log(`Server is running at ${server.info.uri}`);
}

init();