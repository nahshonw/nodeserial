var net = require('net');

var client = new net.Socket();


client.connect(23, '192.168.33.142', function () {
    console.log('Connected');
    client.write('LEDBLUES 0\x0d\x0a');
    setTimeout(() => {
        client.write('LEDBLUES 100\x0d\x0a');
        setTimeout(() => {
            client.write('LEDBLUES 0\x0d\x0a');
            client.destroy(); // kill client after server's response

        }, 3000);
    }, 3000);

});

client.on('data', function (data) {
    console.log('Received: ' + data);
});

client.on('close', function () {
    console.log('Connection closed');
});

