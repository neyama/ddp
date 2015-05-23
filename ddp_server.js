var http = require('http');
var faye = require('faye');
var connect = require('connect');
var serveStatic = require('serve-static')

var app = connect();
app.use(serveStatic('doc_root'));

var server = http.createServer(app);
var engine = new faye.NodeAdapter({mount: '/ddp', timeout: 45});

engine.on('handshake', function(clientId) {
    console.log('[ddp_server] handshake: ' + clientId);
});

engine.attach(server);
server.listen(8000);
console.log('[ddp_server] start');
