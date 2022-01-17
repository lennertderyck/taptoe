import { EventEmitter } from 'events';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { REST_PORT } from './constants.js';
import statusController from './controllers/statusController.js';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

app.get('/status', statusController.getStatus);

io.on('connection', (socket) => {
    socket.on('foo', (data) => console.log(data));
    
    setInterval(() => {
        socket.emit('bar', {
            message: 'Hello from server'
        });
    }, 1000)
});

server.listen(REST_PORT, () => {
    console.log(`Server listening on port ${REST_PORT}`);
    
});