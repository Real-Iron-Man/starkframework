var socket = io(); // Standard universal  / default namespace

function create_stark_table(package){

    try {

        var stark_table = document.createElement("table")

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
            }
    
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
    }


};


function update_stark_value(package){
    
    try {
        document.getElementById(package.id).innerText = package.value;
    } catch (error) {
        console.error("Stark FW : Error updating DIV value dynamically, error = " + error);
    };

};

function get_data_value(get_package){
    socket.emit("get_data", get_package);
};

// General (default) Update Data Event : 
socket.on("got_data", function(data){

    var data_event_type = data.event_type;
    if(data_event_type == "update"){
        update_stark_value(package);
    }
    
});