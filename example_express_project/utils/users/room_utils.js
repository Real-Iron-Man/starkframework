var NODE_ENV;
try {
    NODE_ENV = process.env.NODE_ENV
} catch (error) {
    NODE_ENV = "development"
};

var log_utils = require('../log_utils/log_utils')
var log_color = log_utils.log_color

module.exports = {

    get_room_item : function(db, req_data){

        return new Promise(function(resolve, reject){
            get_inventory_amt_data(db, req_data)
            .then(function(inventory_data){
                console.log("Original Inventory data = " + JSON.stringify(inventory_data));
                if(Number(inventory_data.room_item_quantity) > 0){
                    return update_inventory_amt_data(db, inventory_data);
                };
            })
            .then(function(){
                var result_amt_data_after_update = get_inventory_amt_data(db, req_data);
                result_amt_data_after_update.then(function(data_returned){
                    console.log("Result amount inventory data after update = " + JSON.stringify(data_returned));
                    resolve(data_returned);
                })
            })
            .catch(function(error){
                console.log(log_color.red, "Error getting room inventory, error = " + error);
                return undefined;
            })

            // console.log("Original amount inventory data = " + JSON.stringify(result_amt_data));
            // return result_amt_data
        });
    }
};

async function get_inventory_amt_data(db, req_data){

    var db_result = undefined;
    var room_item_id = req_data.item_id;

    try {

        return new Promise(function(resolve, reject){
            var db_item_update_query = `
                SELECT room_item_id, room_item_quantity
                    FROM room_inventory
                WHERE room_item_id = ${room_item_id}
            `       
            db.query(db_item_update_query, function(error, result){
                if(error){
                    console.log("DB error = " + JSON.stringify(error));
                    reject(error);
                }else{
                    db_result = result[0];
                    console.log("Amount Result = " + JSON.stringify(result));
                    resolve(db_result);
                };
            });

        })

    } catch (error) {
        console.log("DB catch error = " + JSON.stringify(error))
        reject(db_result);
    };

};

async function update_inventory_amt_data(db, update_data){

    console.log("Data for update inventory : " + JSON.stringify(update_data));

    var room_item_id = update_data.room_item_id;

    try {

        return new Promise(function(resolve , reject){
            var db_item_update_query = `
            UPDATE room_inventory
                SET room_item_quantity = room_item_quantity - 1
            WHERE  room_item_id = ${room_item_id}
            `       
            db.query(db_item_update_query, function(error, result){
                if(error){
                    console.log(log_color.red, "DB error = " + JSON.stringify(error));
                    reject(undefined);
                }else{
                    console.dir("Updated Inventory Result = " + JSON.stringify(result));
                    console.dir("Updated inventory successfully");
                    resolve(result);
                };
            })

        })
       
    } catch (error) {
        console.log("DB catch error = " + JSON.stringify(error));
        return;
    };

};