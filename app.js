const express = require('express');
const { Server } = require('ws');
var request = require('request-promise');

const PORT = process.env.PORT || 3000;


const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', function(ws, req) {
    ws.on('message', message => {
        var dataString = message.toString();

        var options = {
            method: 'POST',
            uri: 'http://127.0.0.1:5000/',
            body: dataString,
        };

        var sendrequest = request(options)
            .then(function(parsedBody) {
                let result;
                result = parsedBody.toString();
                console.log(result);
                ws.send(result);
            })
            .catch(function(err) {});
    })
})