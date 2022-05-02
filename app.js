const express = require('express');
const { Server } = require('ws');
var request = require('request-promise');

const PORT = process.env.PORT || 3000; //port for https


const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', function(ws, req) {
    ws.on('message', message => {
        var dataString = message.toString();

        var options = {
            method: 'POST',
            // http:flaskserverurl:port/route
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

        // ws.send(res_flutter);
    })
})

// wss.on('message', message => {
//     var dataString = message.toString();
//     if (dataString == "Hello") {
//         console.log(dataString)
//         ws.send("Hi from Node.js");
//     } else {
//         console.log(dataString)
//         ws.send("Are you not saying hi to me 🥺👉👈");
//     }
// })




// pyshell.on('message', function(message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });

// // end the input stream and allow the process to exit
// pyshell.end(function(err) {
//     if (err) {
//         throw err;
//     };

//     console.log('finished');
// });