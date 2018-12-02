const http = require('http');
const menu = require('./menu.js');
const server = http.createServer(function(req,res) {
    try {
        res.setHeader("Content-Type","text/plain;charset=utf8");
        res.writeHead(200,"ok");
        res.end(JSON.stringify(menu));
    } catch (e) {
        console.log(e);
        res.writeHead(500);
        res.end("oops,the server has error!");
    }
    
})
server.listen(8080);