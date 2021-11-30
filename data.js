const fs = require('fs')
const http = require('http')
const url = require('url')


const server = http.createServer((req,res)=>{
    const reqPath = req.url

    var array = [
        {
            "id" : 1,
            "title" : "post 1"
        },
        {
            "id" : 2,
            "title" : "post 2"
        },
        {
            "id" : 3,
            "title" : "post 3"
        }
    ]
    if(reqPath === '/login'){
        res.end(JSON.stringify(array))
    }
    else if(reqPath === '/students'){
            fs.readFile('/home/sachin/Documents/CGCS phase2/NodeJS/NodeJS-fetching-data-from-url/data.json',(err,data) => {
                const studentsData = JSON.parse(data)
                res.writeHead(200, {'Content-type' : 'application/json'})
                res.end(data)
            } )
    }
    else{
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-header' : 'my header'
        })
        res.end( "<h1>Page not found</h1>")
    }
    
})

server.listen(8000, '127.0.0.1', () => {
    console.log("listening on port 8000")
})