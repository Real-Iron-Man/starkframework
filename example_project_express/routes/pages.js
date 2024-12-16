var express = require('express')
var router = express.Router()

router.get("/", function(req, res){

    var render_package = {
        "render_component_1" : 1,
        "render_component_2" : 0
    };

    res.render("home_logged_out.ejs", render_package);
    
});

module.exports = router