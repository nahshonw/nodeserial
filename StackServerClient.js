var net = require('net');

var server = net.createServer(function (connection) {
    var buffer = '';
    
    function receivedMessage(value) {
        console.log('received: ' + JSON.stringify(value));
    }
    
    function protocolError() {
        console.log('protocol error');
        connection.close();
    }
    
    function parseMessages(buf) {
        console.log('parsing ' + buf.length + ' code units worth of messages');
        if (buf.substring(0, 1) !== '\x1e') {
            protocolError();
            return;
        }
        var m, rx = /\x1e([^\x1e]*)/g;
        while (m = rx.exec(buffer)) {
            if (m[1] === '')
                continue;
            try {
                var value = JSON.parse(m[1]);
            } catch (e) {
                if (e instanceof SyntaxError)
                    continue;   // RFC 7464 §2.3
                throw e;
            }
            receivedMessage(value);
        }       
    }
    
    connection.on('data', function (data) {
        buffer += data.toString('utf8');
        console.log(buffer.length + ' code units in the buffer');
        var lastRS = buffer.lastIndexOf('\x1e');
        if (lastRS === 0)
            return;
        var fullMessages = buffer.substring(0, lastRS);
        buffer = buffer.substring(lastRS, buffer.length);
        parseMessages(fullMessages);
        try {
            var value = JSON.parse(buffer);
        } catch (e) {
            if (e instanceof SyntaxError)
                return;  // maybe just truncated; defer error until later
            throw e;
        }
        receivedMessage(value);
        buffer = '';
    });

    connection.on('close', function () {
        console.log('closed');
        parseMessages(buffer);
    });
});

server.listen(5000, '192.168.33.101');