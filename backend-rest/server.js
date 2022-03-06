import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { REST_PORT } from './constants.js';
import statusController from './controllers/statusController.js';

console.log('test')

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'Origin', 'Host', 'Connection', 'Accept-Encoding', 'Accept-Language', 'Cookie'],
}));

app.get('/status', statusController.getStatus);

io.on('connection', (socket) => {
    socket.on('status', () => {
        socket.emit('status', {
            status: 'OK'
        });
    });
});

server.listen(REST_PORT, () => {
    console.log(`Server listening on port ${REST_PORT}`);
});