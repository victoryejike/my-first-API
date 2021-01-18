const http = require('http');
const { url } = require('inspector');

const todos = [
    {id: 1, text: 'Todo one'},
    {id: 2, text: 'Todo two'},
    {id: 3, text: 'Todo three'},
]

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Powered-By', 'Node.Js')

    let body = [];
    const {method, url} = req;

    req.on('data', (chunk)=>{
        body.push(chunk);
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();

        let status = 404;
        const response = {
        success: false,
        data: null,
    }
        if(method === 'GET' && url === '/todos'){
            status = 200;
            response.success = true;
            response.data = todos;
        }else if(method === 'POST' && url === '/todos'){
            const { id, text } = JSON.parse(body);

            if(!id || !text){
                status = 400
            }else {
                todos.push({ id, text });
                status = 201;
                response.success = true;
                response.data = todos;
            }
        }
        
        res.writeHead(status, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Node.Js' 
        })
        res.end(JSON.stringify(response));
    })
    
})

const PORT = 5000;

server.listen(PORT, () => console.log(`server is listening on port ${PORT}`));