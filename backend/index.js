// ทำการ import โมดูล http
const http = require('http');
const host = 'localhost';
const port = 8000;


const reqestlistener = function (req, res) {
    res.writerHead(200)
    res.end('Hello, world! This is my first sever')
}

const server = http.createServer(reqestlistener);
server.listen(port, host, () => {
    console.log(` Server is running on http://${host}:${port}` );
})
