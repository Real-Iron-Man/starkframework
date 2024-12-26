var socket = io(); // Standard universal  / default namespace

function create_stark_table(package){

    // alert("package = " + JSON.stringify(package));

    try {

        var stark_table = document.createElement("table");

        stark_table.id = package.name
        stark_table.name = package.name
        stark_table.className = package.className
    
        var table_data = package.data;
    
        for(var i = 0; i < table_data.length; i++){

            var table_row = document.createElement("tr");
            var table_element = document.createElement("td");
            table_element.id = table_data[i].id;
            table_element.name = table_data[i].name
            table_element.className = table_data[i].className;
            table_element.innerText = table_data[i].value
    
            var function_index = my_function_maps.map(function(x){
                return x.name
            }).indexOf(table_data[i].onClick);
    
            if(function_index > -1){
                var ele_function = my_function_maps[function_index].fx
                table_element.onclick = ele_function
            };
    
            table_row.appendChild(table_element);
            stark_table.appendChild(table_row);

        };
    
        if(package.appendToDiv){
            var append_to_container = document.getElementById(package.appendToDiv);
            append_to_container.appendChild(stark_table);
        }else{
            var body_container = document.getElementById("body_container");
            body_container.appendChild(stark_table);
        };

    } catch (error) {
        console.error("Stark FW : Error creating table dynamically, error = " + error);
        console.warn("Make sure the 'appendToDiv' DIV with ID is present in your file");
    };


};


function stark_show_divs(package_data){

    // alert("started stark_show_divs ... " + JSON.stringify(package_data));

    try {

        var show_divs = package_data.show_divs;

        if(show_divs.length > 0){
            for(var i = 0 ; i < show_divs.length; i++){
                // alert(" show_divs[i] ... " + JSON.stringify(show_divs[i]));
                // alert(" show_divs[i].div_id ... " + JSON.stringify(show_divs[i].div_id));
                document.getElementById(show_divs[i].div_id).style.display = show_divs[i].display;
            };
        };

      
    } catch (error) {
        // alert("error stark_show_divs ... " + JSON.stringify(error));
        console.error("Could not show div named " + show_divs[i].div_id , + " error = " + error)
    }
};

function stark_hide_divs(package_data){

    // alert("started stark_hide_divs ... ");

    try {

        var hide_divs = package_data.hide_divs;

        if(hide_divs.length > 0){
            for(var i = 0 ; i < hide_divs.length; i++){
                document.getElementById(hide_divs[i].div_id).style.display = "none";
            };
        };

    
    } catch (error) {
        console.error("Could not show div named " + hide_divs[i].div_id , + " error = " + error)
    }
};



function update_stark_value(package){
    
    try {

        if(package.error){
            document.getElementById(package.error.error_div).style.display = "block";
            document.getElementById(package.error_div).innerText = package.error.error_msg
            return;
        };

        document.getElementById(package.id).innerText = package.value;

    } catch (error) {
        console.error("Stark FW : Error updating DIV value dynamically, error = " + error);
    };

};

function show_error_event(data){
    try {
        document.getElementById("container_error_notification").innerText = data;
    } catch (error) {
        console.error("Stark FW : error updating error container, error = " + error);
    };
}

function get_name_value(get_package){
    socket.emit("get_name", get_package);
};

// General (default) Update Data Event : 
socket.on("set_name", function(data){

    var data_event_type = data.event_type;
    
    if(data_event_type == "update"){
        update_stark_value(package);
    };
    
});

socket.on("error_msg", function(data){

    try {
        document.getElementById(data.error_div).style.display = "block";
        document.getElementById(data.error_div).innerText = package.error.error_msg 
    } catch (error) {
        console.error("Stark FW : Error updating error DIV value dynamically, error = " + error);
    };
   
});