module.exports = {
    
    log_color : {

        white                       : "\x1b[37m%s\x1b[0m"       , 
        black                       : "\x1b[30m%s\x1b[0m"       ,
        red                         :  "\x1b[31m%s\x1b[0m"      ,
        red_neon                    : "\x1b[38;5;197m"          ,
        green                       : "\x1b[32m%s\x1b[0m"       ,
        yellow_neon                 : "\x1b[38;5;190m"          ,
        yellow                      : "\x1b[33m%s\x1b[0m"       ,
        blue                        : "\x1b[34m%s\x1b[0m"       ,
        magenta                     : "\x1b[35m"                ,
        cyan                        : "\x1b[36m"                ,
        background_text_yellow      : "\x1b[43m%s\x1b[0m"       ,
        background_text_red         : "\x1b[31m%s\x1b[0m"       ,
        background_text_blue        : "\x1b[34m%s\x1b[0m"       ,
        background_text_white       : "\x1b[37m%s\x1b[0m"       ,
        background_text_green       : "\x1b[32m%s\x1b[0m"       ,

    },

    no_log_color : {
        white                       : ""       , 
        black                       : ""       ,
        red                         : ""       ,
        green                       : ""       ,
        yellow                      : ""       ,
        blue                        : ""       ,
        magenta                     : ""       ,
        cyan                        : ""       ,
        background_text_yellow      : ""       ,
        background_text_red         : ""       ,
        background_text_blue        : ""       ,
        background_text_white       : ""       ,
        background_text_green       : ""       ,

    },

    date_time_stamp : function(){
        let date_obj = new Date();
        var day = ("0" + date_obj.getDate()).slice(-2);
        var month = ("0" + (date_obj.getMonth() + 1 )).slice(-2);
        var year = date_obj.getFullYear();
        var hours = date_obj.getHours();
        var minutes = date_obj.getMinutes();
        var seconds = date_obj.getSeconds();
        var date_string  = day + "/" + year + "/" + ":"  + minutes + ":" + seconds
        return date_string;
    },

    current_time_stamp_db_format : function(){
        let date_obj = new Date();
        var day = ("0" + date_obj.getDate()).slice(-2);
        var month = ("0" + (date_obj.getMonth() + 1 )).slice(-2);
        var year = date_obj.getFullYear();
        var hours = date_obj.getHours();
        var minutes = date_obj.getMinutes();
        var seconds = date_obj.getSeconds();
        var date_string  = year + "-" + month + "-" + day + " :" + hours + ":"  + minutes + ":" + seconds // yyyy-mm-dd HH:mm:ss
        return date_string;
    }
}