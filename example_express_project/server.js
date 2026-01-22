const express = require('express')
const app = express()                              // Set application variable to express
var server = require('http').Server(app)           // Set main Server passing in app which is set to express
var io = require('socket.io')(server)         

const server_port = 8080;
var mysql = require('mysql');

const fs = require("fs");

try {
    require('dotenv').config();                     // Still need for offline or development mode
} catch (error) {
    console.log(`❌ Catch Error : Could not setup dotenv, full error = ${error.stack}` );
};

// Do NOT publish .env file with pw or configs into your source repo
var db_port         = 3306;
var db_pw           = process.env.db_pw;
var db_name         = process.env.db_name;
var db_host         = process.env.db_host;
var db_user_name    = process.env.db_user_name;

var is_socket_debug_on = process.env.is_socket_debug_on;
if(!is_socket_debug_on){
    is_socket_debug_on = false;
};

var db = mysql.createPool({
    host            : db_host,
    user            : db_user_name,
    database        : db_name,
    password        : db_pw,
    connectionLimit : 30000,
    connectTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    port            : db_port,
    // ssl             : { ca: fs.readFileSync("utils/db/DigiCertGlobalRootCA.crt.pem") }
});

var db_utils = require('./utils/db/db_utils.js');

var JWT_SECRET = process.env.JWT_SECRET; // Note : you can also use a secret manager to get or your own method

app.set('view engine', "ejs")
app.set('views', __dirname +'/views')

app.use(express.static("public"));

var favicon = require('serve-favicon');
app.use(favicon('public/favicon.ico'));

var page_routes = require('./routes/pages');
app.use("/", page_routes);
app.get("/", page_routes);

server.listen(server_port, function(){
    console.log("✅ server started on " + server_port);
    console.log("\n\n\n Click this to go to app : http://localhost:8080/")
    test_db_connection();
});

function test_db_connection(){
    db.query("select COUNT(1+1) as sum from user", function(error, result){
        if(error){
            console.log("DB setup ERROR, error = " + error);
        }else{
            console.dir("DB setup OK");
        };
    });
};

function send_socket_error_frontend(error_obj, socket){
    try {
        socket.emit("io_error", error_obj);
    } catch (error) {
        console.log("Error : could not send error message to user");
        return;
    };

};

var user_utils = require('./utils/users/user_utils.js');
var room_utils = require('./utils/users/room_utils.js');
var log_utils = require('./utils/log_utils/log_utils.js');
var log_color = log_utils.log_color;

io.on('connection', function(socket){

    socket.on("joined_room", function(data){
        console.log(log_color.yellow, "User joined room # " + JSON.stringify(data));
    });

    socket.on("get_item", function(data){

        try {

            if(data.number_attempts > 3){
                console.log("Max item attempts reached, wait before trying again");
                socket.emit("item_refresh_wait", {});
                setTimeout(function(){
                    socket.emit("item_refresh_ok", {});
                }, 3000); // Wait 3 seconds before allowing to try again on the front end
                return;
            };

            console.log("New Customer Request : " + JSON.stringify(data));
            var get_room_item = room_utils.get_room_item(db, data)
            // console.log("Final Responded inventory data = " + get_room_item);
            // io.emit("item_update", get_room_item);
          
            get_room_item
            .then(function(room_req_data){
                console.log("Final Responded inventory data = " + JSON.stringify(room_req_data));
                io.emit("item_update", room_req_data);
            })
            .catch(function(error){
                console.log(log_color.red, " Error with get item, error = " + error);
                return
            });

            // get_room_item.then(function(data){
            //     console.log("Responded inventory data = " + get_room_item);
            //     io.emit("item_update", get_room_item);
            // })

            if(!get_room_item){
                console.log("Error getting room item");
            };
        } catch (error) {
            console.log(log_color.red, " Error with get item, error = " + error);
            return;
        };
    });

    socket.on("get_table_data_1", function(){

        console.log("get_table_data_1");
        
        var socket_package = {
            "id"            : "test", 
            "name"          : "test",
            "className"     : "test",
            // "appendToDiv"  : null,
            "event_type"    : "append_list",
            "appendToDiv"   : "container_1",     // either provide a name or null
            "data"          : [
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
            ],
            "show_divs"     : [],
            "hide_divs"     : [],
            "error"     : ""
        }

        socket.emit("table_1_test", socket_package);

    });

    socket.on("get_update_1", function(){

        if(is_socket_debug_on){
            console.log("get_update_1...")
        };

        var socket_package = {
            "id"            : "test_single_data_update", 
            "name"          : "test",
            "value"         : "Update Event!",
            "className"     : "test",
            "event_type"    : "update",
            "appendToDiv"   : "",
            "data"          : "",
            "show_divs"     : [
                {
                "div_id"    : "test_single_data_update",
                "display"   : "flex"
                },
                {
                    "div_id"    : "show_other_container_test",
                    "display"   : "flex"
                }
            ],
            "hide_divs"     : [
                {
                    "div_id" : "got_update_1"
                }
            ],
            "error"         : "",
        };


        if(is_socket_debug_on){
            console.log("got_update_1 package = " + JSON.stringify(socket_package));
        };

        socket.emit("got_update_1", socket_package);

    });

    socket.on("get_name", function(data){

        var socket_package = {
            "id"            : "test_id_1",
            "name"          : "test_name_1",
            "value"         : "Got Data Value",
            "className"     : "test",
            "event_type"    : "update",
            "appendToDiv"   : "",
            "data"          : "",
            "show_divs"     : [],
            "hide_divs"     : [],
            "error"         : error_obj,
        };

        socket.emit("set_name", socket_package);

    });

    // Example of getting data from a DB via 'IO GET event' : 
    socket.on("get_users_data_names", async function(socket_data){

        try {
            var error_obj;
            
            console.log("Socket offset pagination = " + JSON.stringify(socket_data));

            var db_offset = socket_data.db_offset;
            console.log("Socket offset value = " + JSON.stringify(db_offset));

            var user_data = await user_utils.get_user_names(db, db_offset);

            console.dir("user_data found = " + JSON.stringify(user_data));

            if(!user_data){

                error_obj = {
                    "error_code"    : 1,
                    "error_msg"     : "user data error",
                    "error_event"   : "place",  // "place" = place into id of this package, "error_div" = place into error notification div
                    "error_div"     : "container_error_notification"
                };

                send_socket_error_frontend(error_obj);

            };

            var socket_package = {
                "id"                : "user_data", 
                "name"              : "user_data",
                "className"         : "user_data",
                "event_type"        : "append",
                "appendToDiv"       : "container_2_user_data",
                "data"              : user_data,
                "show_divs"         : [],
                "hide_divs"         : [],
                "error"             : error_obj,
            };

            socket.emit("got_users_data_names", socket_package);

        } catch (error) {
            return;
        };

    });

    // Example of posting data into a DB via 'IO POST event' : 
    socket.on("post_data_1", async function(data){

        try {
             if(is_socket_debug_on){
            console.log("post_data_1, data = " + JSON.stringify(data));
        };
    
        var user_id_from_cookie = await user_utils.get_user_id_from_cookie_only(data.user_ck, JWT_SECRET, "post_data_1");
        console.log("user_id_from_cookie = " + JSON.stringify(user_id_from_cookie));

        if(!user_id_from_cookie){
            if(is_socket_debug_on){
                console.log("Error with post_data_1...")
            };
            return emit_error_event(socket, "cannot post data 1", 1, "place", "container_error_notification")
        };

        var post_data_value = data.value; // Add a single data value with user id into DB example
        var post_data_into_user = await db_utils.post_data_1(db, post_data_value, user_id_from_cookie);
        
        if(is_socket_debug_on){

            if(!post_data_into_user){
                console.log("Error with posting data into post_data_1")
            }else{
                console.dir("post_data_into_user = " + JSON.stringify(post_data_into_user));
            }

            // Handle what happens after posting data, example : 
            // Example : 
            var socket_package = {
                "data" : post_data_into_user
            };

            socket.emit("posted_data_1",  socket_package);

        };
        } catch (error) {
            return;
        };
    })

});

function emit_error_event(socket, error_reason, error_code, error_event, error_div){

    var error_obj = {
        "error_code"    : error_code,
        "error_msg"     : error_reason,
        "error_event"   : error_event,  // "place" = place into id of this package, "error_div" = place into error notification div
        "error_div"     : error_div
    };

    socket.emit("error_msg", error_obj);

};