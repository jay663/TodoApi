'use strict';

const Hapi = require("hapi");
const cuid = require("cuid");

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
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


const init = async () => {
    await server.start();
    console.log(`Server is running at ${server.info.uri}`);
}

init();