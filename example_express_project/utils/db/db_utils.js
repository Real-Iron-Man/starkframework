var is_db_debug_on = true;

module.exports = {

    post_data_1 : async function(db, data, user_id){

        try {
            
            var insert_package = {
                "post_data_value"   : data,
                "user_id"           : user_id
            };

            if(is_db_debug_on){
                console.dir("insert_package data = " + JSON.stringify(insert_package));
            };

            var query_post_data_1 = "INSERT INTO post_data SET ? "
            db.query(query_post_data_1, [insert_package], function(error, result){
                if(error){
                    return "error";
                }else{

                    if(is_db_debug_on){
                        console.dir("Successfully inserted data, result = " + JSON.stringify(result));
                    };

                    return "success";
                }
            })
        } catch (error) {
            return "error";
        };

    }

}