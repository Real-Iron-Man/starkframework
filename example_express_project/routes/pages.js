var express = require('express')
var router = express.Router()

var room_utils = require('../utils/users/room_utils.js')

router.get("/", function(req, res){

    var render_package = {
        "render_component_1" : 1,
        "render_component_2" : 0
    };

    res.render("home_logged_out.ejs", render_package);
    
});

router.get("/login", function(req, res){

    // auth logic (example brypt) here to get User ID from cookie or token

    var render_package = {
        "room_id" : 1,
    };

    res.render("home_logged_in.ejs", render_package);
    
});

/*

Simple API example:
Calling API :

Option #1 : powershell > curl.exe -X GET http://localhost:8080/example_data
Option #2 : git bash : curl -X GET http://localhost:8080/example_data
Option #3 : go to route within application : open http://localhost:8080/example_data

*/
router.get("/example_data", function(req, res){
    var get_example_data = {
        "data" : "test"
    };
    res.json(get_example_data);
});

module.exports = router