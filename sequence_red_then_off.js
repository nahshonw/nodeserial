var net = require('net');

var client = new net.Socket();
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


client.connect(23, '192.168.33.142', function () {
    console.log('Connected');
    client.write('LEDREDS 0\x0d\x0a');

    for (let i = 0; i < array.length; i++) {
        setTimeout(function () {

            client.write('LEDRED ' + array[i] + ' 100\x0d\x0a');
            //console.log(array[i]);
if (array[i] == 10){

    client.write('LEDREDS 0\x0d\x0a');
            client.destroy();

}



        }, array[i] * 1500)
    }

});

client.on('data', function (data) {
    console.log('Received: ' + data);
});

client.on('close', function () {
    console.log('Connection closed');
});
