const jwt = require('jsonwebtoken'); // Auth token

var NODE_ENV;
try {
    NODE_ENV = process.env.NODE_ENV
} catch (error) {
    NODE_ENV = "development"
};

var is_socket_debug_on = true;
var is_profile_util_debug_on = true;

module.exports = {

    get_user_names : async function(db){

        try {

            return new Promise(function(resolve, reject){ // Solution pattern from : https://stackoverflow.com/questions/67879839/mysql-query-in-node-js-is-returning-undefined

                db.query("SELECT user_name as value FROM user", function(error, result){
                    if(error){
                        console.log("🟥 Error got users = " + error);
                        reject (undefined);
                    }else{
                        console.log("Got users = " + JSON.stringify(result));
                        resolve(result);
                    };
                    
                })
            })

        } catch (error) {
            reject (undefined);
        }
    },

    get_user_id_from_cookie_only : async function(cookie, JWT_SECRET, location_of_call){

        if(is_socket_debug_on){
            console.log("get_user_id_from_cookie_only , location = " + location_of_call);
        };

        try {

            // if (NODE_ENV == 'production') {
                //// replace with your util (ex. get secret via secret manager)
                // JWT_SECRET =  
            // };

            return user_id = get_user_id_from_cookie_and_jwt(cookie, JWT_SECRET);

        } catch (error) {
            return undefined;
        };

    }
}

function get_user_id_from_cookie_and_jwt(cookie, JWT_SECRET) {

    if(!cookie){
        return undefined;
    }
    if (cookie) {
      // If xp cookie exists for specific user (i.e. logged in)
  
      if (is_profile_util_debug_on) {
        console.log('In getUser...CookieSimple ...');
      };
  
      jwt.verify(cookie, JWT_SECRET, function (error, data) {
        if (error) {
  
          if (is_profile_util_debug_on) {
            console.log('🟥 profile util Error getting profile JWT user token' + error)
          };
  
          user_id = undefined;
  
          return user_id;

        } else {
        
            user_id = data.id; // get user id from stored cookie
            
            if (is_profile_util_debug_on) {
              console.log('✅ User Creds found, valid user id, user id = ' + user_id);
          };
  
          return user_id;

        };
      });
  
    } else {
      if (is_profile_util_debug_on) {
        console.log('🟥 profile util - User Creds not found');
      };
  
      user_id = undefined;
      return user_id;
    };
  
    return user_id;
  };