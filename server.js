const http = require("http")
const fs = require("fs")
const con = require("./DBConnection")
let disc = ""
let techname = ""
let dat = ""
const hostname = "127.0.0.1"
const port = 3000




const server = http.createServer((req, res) => {

    if (req.method == "GET" && req.url == '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream('./index.html').pipe(res)   //will send the response of index.html poage

        let conn = con.getConnection()
        conn.query('SELECT * FROM pepcalender.events', function (error, results, fields) {
            // results is an array of row
            if (error) throw error;
            results.forEach(events => {
                //i think this is where we have take some varialbes and store the input from the server and display it using html but how to send it to script.js?
                dsic = events.Description
                techname = events.Name
                dat = events.date
                // console.log(events.Description);
                console.log(dsic);
                console.log(techname);
                console.log(dat);
            });
        })
        conn.end()
    }

    //not sure
    else if (req.method == "GET" && req.url == '/home') {
        res.statusCode == 200;
        res.setHeader('Content-Type', 'application/json');

        var conn = con.getConnection();

        conn.query('SELECT * FROM pepcalender.events', function (error, results, fields) {
            if (error) throw error;

            var comments = JSON.stringify(results);

            res.end(comments);
        });

        conn.end();
    }


    else if (req.method == "POST" && req.url == "/insert") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        let content = '';
        req.on('data', function (data) {
            content += data;
            let obj = JSON.parse(content);
            // console.log(data);


            // console.log("The Event description  is: "+ obj.description);
            // console.log("The Teacher name  is: "+ obj.name);
            // console.log("The date   is: "+ obj.Date);


            let conn = con.getConnection();

            conn.query('INSERT INTO pepcalender.events (events.Description, events.Name, events.date) VALUES (?,?,?)', [obj.description, obj.name, obj.Date], function (error, results, fields) {
                if (error) throw error;
                // console.log("Success!");
            });

            conn.end();
            res.end("Success!");
        });

    }
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    else if (req.method == "DELETE" && req.url == "/delete") {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')

        let content = '';
        req.on('data', function (data) {
            content += data;
            // console.log("###"+content);

            let obj = JSON.parse(content)
            // console.log("***"+obj.clicked);
            let conn2 = con.getConnection()
            let mukesh = `DELETE FROM pepcalender.events WHERE date=?`
            // conn2.query("DELETE FROM pepcalender.events WHERE date = spotify ")
            conn2.query(mukesh, obj.clicked)
            conn2.end();
            res.end("Success!");
        });
    }

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    else if (req.method == 'GET' && req.url == '/style.css') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/css')
        fs.createReadStream('./style.css').pipe(res)
    }
    else if (req.method == 'GET' && req.url == '/script.js') {
        res.writeHead(200, { "Content-Type": "text/javascript" })
        fs.createReadStream("./script.js").pipe(res)
    }
})

server.listen(process.env.PORT || PORT, () => {
    console.log(`server is running at http://${hostname}:${port}/`);
})