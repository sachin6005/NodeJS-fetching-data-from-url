const fs = require("fs")
const url = require("url")
const http = require("http")
const replaceTemplate = require('./modules/replaceTemplate')
const  slugify  = require("slugify")


const studentPage = fs.readFileSync("/home/sachin/Documents/CGCS phase2/NodeJS/NodeJS-fetching-data-from-url/index.html", "utf-8")
const singleStudent = fs.readFileSync("/home/sachin/Documents/CGCS phase2/NodeJS/NodeJS-fetching-data-from-url/students.html","utf-8")
const data = fs.readFileSync("/home/sachin/Documents/CGCS phase2/NodeJS/NodeJS-fetching-data-from-url/data.json","utf-8")
const studentData = JSON.parse(data)


console.log(slugify(stuDENts, {lower:true}))

const slug = studentData.map(el => slugify(el.name))

const server = http.createServer((req,res)=>{
    const {query, pathname} = url.parse (req.url, true)
    
    if(pathname === '/login'){
        res.end("test")
    }
    else if (pathname === '/students'){

        res.writeHead(200, {"content-type" : "text/html"})

        if(query.id){
            const filterData = studentData[query.id]
            const studentCard = replaceTemplate(singleStudent, filterData)
            const output = studentPage.replace(/{%STUDENTS_DATA%}/g , studentCard).replace(/{%TOTAL_COUNT%}/g, 1 )
            res.end(output)
        }
        else{
            const studentCard = studentData.map(el => replaceTemplate(singleStudent, el)).join('')
            const output = studentPage.replace(/{%STUDENTS_DATA%}/g , studentCard).replace(/{%TOTAL_COUNT%}/g, studentData.length)
            res.end(output)
        }
       
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
