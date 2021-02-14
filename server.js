// const express = require('express');

// const app = express();

// app.use(express.static('.'));

// app.get('/data', (req, res) => {
//     console.log('data');
// });

// app.listen(3000, () => {
//     console.log('Сервер подключен на порте 3000. Для отключения нажмите ctrl+C');
// });

const http = require('http');
const static = require('node-static');

const file = new static.Server('.');

http.createServer((req, res) => {
    file.serve(req, res);
    console.log('Сервер подключен на порте 3000. Для отключения нажмите ctrl+C');
}).listen(3000);