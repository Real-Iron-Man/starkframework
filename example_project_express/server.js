const express = require('express')
const app = express()                              // Set application variable to express
var server = require('http').Server(app)           // Set main Server passing in app which is set to express
var io = require('socket.io')(server)         
// Express framework - example from https://expressjs.com/en/starter/hello-world.html

const port = 8080;

app.set('view engine', "ejs")
app.set('views', __dirname +'/views')

app.use(express.static("public/"));

var favicon = require('serve-favicon');
app.use(favicon('public/favicon.ico'));

var page_routes = require('./routes/pages');

app.use("/", page_routes)
app.get("/", page_routes)

server.listen(port, function(){
    console.log("server started on " + port)
});

io.on('connection', function(socket){

    socket.on("get_table_data_1", function(){

        console.log("get_table_data_1");

        var socket_package = {
            "id"        : "test", 
            "name"      : "test",
            "className" : "test",
            // "appendToDiv"  : null,
            "appendToDiv"  : "container_1",     // either provide a name or null
            "data"      : [
                {
                    // Left = HTML + JS , right = values + actions 
                    "id"        :   1,
                    "name"      :   "name-1",
                    "value"     :   "Test-" + 1,
                    "className" :   "test_table",
                    "onClick"   :   "new_stark_fx_1"
                },
                {
                    "id"        :   2,
                    "name"      :   "name-2",
                    "value"     :   "Test-" + 2,
                    "className" :   "test_table",
                    "onClick"   :   "new_stark_fx_2"
                }
            ]
        }

        socket.emit("table_1_test", socket_package);

    })

    socket.on("get_update_1", function(){

        var socket_package = {
            "id"        : "test", 
            "name"      : "test",
            "value"     : "Update Event!",
            "className" : "test",
        }

        socket.emit("got_update_1", socket_package);

    })

    socket.on("get_data", function(data){

        var data_package = {
            "id"            : "test_id_1",
            "name"          : "test_name_1",
            "value"         : "Got Data Value",
            "event_type"    : "update"
        };

        socket.emit("got_data", data_package);

    });

});

