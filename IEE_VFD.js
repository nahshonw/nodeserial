var net = require('net');

var client = new net.Socket();


client.connect(4001, '192.168.33.143', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function (data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});


client.on('error', function (error) {
    console.log('This is the Error: ' + error);
});


client.on('close', function () {
    console.log('Connection closed');
});
