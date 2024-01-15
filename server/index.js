var express = require('express');
const config = require('./config');
const cors = require('cors');
const socketio = require('socket.io');
const { createRouter } = require('./src/router');

var app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const server = app.listen(port, () => {
    console.log('Server is running on port:', port);
});

const io = socketio(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

const router = createRouter(io);
app.use('/', router);
