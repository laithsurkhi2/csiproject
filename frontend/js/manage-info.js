document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const isNew = params.has("new"); 
    const datatype = params.get("datatype");
    const title = document.createElement('h1');

    title.innerHTML = 'Manage '+ datatype.toString();
    document.body.appendChild(title);

    const info = document.createElement('div');
    var elementID;

    const confirmation = document.createElement('p');
    confirmation.setAttribute("id", "confirmation-message")
    confirmation.innerHTML="";    

    const buttonAdd= document.createElement('button');
    buttonAdd.innerHTML = "Add "+ datatype;
    buttonAdd.setAttribute('onclick', '')

    const buttonUpdate = document.createElement('button');
    buttonUpdate.innerHTML = "Update "+ datatype;
    buttonUpdate.setAttribute('onclick', '');

    const buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = "Delete " + datatype;
    buttonDelete.setAttribute('onclick', '');

    const buttonBack = document.createElement('button');
    buttonBack.innerHTML = "Go back";
    buttonBack.setAttribute('id', "go-back");

    getElem(datatype, isNew);
    document.body.appendChild(info);

    document.body.appendChild(buttonAdd);
    document.body.appendChild(buttonUpdate);
    document.body.appendChild(buttonDelete);
    document.body.appendChild(confirmation);
    document.body.appendChild(buttonBack);

    function getElem(datatype, isNew){
        console.log(datatype, isNew);
        if(isNew === true){
            buttonUpdate.setAttribute('class', "disabled");
            buttonDelete.setAttribute('class', "disabled"); 
        }else{
            buttonAdd.setAttribute('class', "disabled");
        }
        switch(datatype.toLowerCase()){
            case 'employee' :{
                if(isNew === true) {
                    info.innerHTML =`<label>SSN:</label><br>
                        <input id="ssn"/><br>
                        <label>First Name:</label><br>
                        <input id="first_name"/><br>
                        <label>Last Name:</label><br>
                        <input id="last_name"/><br>
                        <label>Position:</label><br>
                        <input id="position"/>
                        `;
                }else{
                    elementID = new URLSearchParams(window.location.search).get("ssn");
                    console.log(elementID);
                    fetch(`/api/employees/${elementID}`)
                    .then(response => response.json())
                    .then((employeeDetails) => {
                        console.log(employeeDetails);
                        info.innerHTML =`<label>SSN:</label><br>
                        <input id="ssn" value="${employeeDetails.ssn}"/><br>
                        <label>First Name:</label><br>
                        <input id="first_name" value="${employeeDetails.first_name}"/><br>
                        <label>Last Name:</label><br>
                        <input id="last_name" value="${employeeDetails.last_name}"/><br>
                        <label>Position:</label><br>
                        <input id="position" value="${employeeDetails.position}"/>
                        `;
                    })
                    .catch(error => console.error('Error fetching data:', error));
                }
                break;
            }
            case 'customer':{
                if (isNew === true){
                    info.innerHTML =  `
                        <label>First Name:</label><br>
                        <input id="first_name" /><br>
                        <label>Last Name:</label><br>
                        <input id="last_name"/><br>`;
                } else {
                    elementID = new URLSearchParams(window.location.search).get("id");
                    fetch(`/api/customers/${elementID}`)
                    .then(response => response.json())
                    .then(customerDetails =>{
                        console.log(customerDetails);
                        info.innerHTML =  `
                        <p>ID : <span>${customerDetails.id}<\span><\p>
                        <label>First Name:</label><br>
                        <input id="first_name" value="${customerDetails.first_name}"/><br>
                        <label>Last Name:</label><br>
                        <input id="last_name" value="${customerDetails.last_name}"/><br>
                        <p>Registration Date : <span>${customerDetails.registration_date}<\span><\p>`;
                    })
                    .catch(error => console.error('Error fetching data:', error));
                }
                break;
            }
            case 'hotel' :{
                if (isNew === true){
                    info.innerHTML = `<label>Hotel Name:</label><br>
                        <input id="hotel_name"/><br>
                        <label for="hotel-chain">Hotel Chain:</label><br>
                        <input id="hotel-chain"><br>
                        <label>Hotel Address:</label><br>
                        <input id="address"/><br>
                        <label>Category</label><br>
                        <input id="category"><br>
                        <label>Manager SSN</label><br>
                        <input id="manager-ssn"><br>
                        <label>Email</label><br>
                        <input id="email">`
                        
                } else {
                    elementID = new URLSearchParams(window.location.search).get("name");
                    fetch(`/api/hotels/${elementID}`)
                    .then(response => response.json())
                    .then(hotelDetails =>{
                        console.log(hotelDetails);
                        info.innerHTML = `<label>Hotel Name:</label><br>
                        <input id="hotel_name" value="${hotelDetails.name}"/><br>
                        <p>Hotel Chain Name : <span>${hotelDetails.hotel_chain_name}<\span><\p>
                        <label>Hotel Address:</label><br>
                        <input id="address" value="${hotelDetails.address}"/><br>
                        <label>Category</label><br>
                        <input id="category" value="${hotelDetails.category}"><br>
                        <label>Manager SSN</label><br>
                        <input id="manager-ssn" value="${hotelDetails.manager_ssn}"><br>
                        <label>Email</label><br>
                        <input id="email" value="${hotelDetails.email_value}">`
                    })
                    .catch(error => console.error('Error fetching data:', error));

                    }
                    break;
            }
            case 'room' :{
                if(isNew === true){
                    info.innerHTML = `<label>Room ID:</label><br>
                        <input id="room_id"/><br>
                        <label>Price:</label><br>
                        <input id="price"><br>
                        <label>Hotel Chain Name</label><br>
                        <input id="hotel_chain_name"/><br>
                        <label>Hotel Name:</label><br>
                        <input id="hotel_name"/><br>
                        <label>Hotel Address</label><br>
                        <input id="hotel_address"/><br>
                        <label>Capacity</label><br>
                        <input id="capacity"><br>
                        <label>View</label><br>
                        <input id="view"><br>
                        <label>Extension</label><br>
                        <input id="extension">
                        `
                } else{
                    elementID = new URLSearchParams(window.location.search).get("room_id");
                    fetch(`/api/rooms/${elementID}`)
                    .then(response => response.json())
                    .then(roomDetails => {
                        console.log(roomDetails);
                        info.innerHTML = `
                        <p>Room ID : <span>${roomDetails.id}<\span><\p>
                        <label>Price:</label><br>
                        <input id="price" value="${roomDetails.price}"><br>
                        <p>Hotel Chain Name : <span>${roomDetails.hotel_chain_name}<\span><\p>
                        <p>Hotel Name : <span>${roomDetails.hotel_name}<\span><\p>
                        <p>Hotel Address : <span>${roomDetails.hotel_address}<\span><\p>
                        <label>Capacity</label><br>
                        <input id="capacity" value="${roomDetails.capacity}"><br>
                        <label>View</label><br>
                        <input id="view" value="${roomDetails.view}"><br>
                        <label>Extension</label><br>
                        <input id="extension" value="${roomDetails.extension}">
                        `
                    })
                    .catch(error => console.error('Error fetching data:', error));
                }
            }
        }
    }
  
    buttonAdd.addEventListener("click", function (){
        switch (datatype){
            case "employee":{
                const ssn = document.getElementById("ssn").value;
                const firstName = document.getElementById("first_name").value;
                const lastName = document.getElementById("last_name").value;
                const position = document.getElementById("position").value;

                fetch('/api/employees', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ssn, firstName, lastName, position}), // Ensure userId is valid
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data); 
                      document.getElementById("confirmation-message").innerHTML = "Employee created!";
                    })
                    .catch((error) => {
                      console.error("Error creating employee:", error);
                    });
                    break;
            }
            case "customer":{

                const firstName = document.getElementById("first_name").value;
                const lastName = document.getElementById("last_name").value;

                fetch('/api/customers', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ firstName, lastName}), // Ensure userId is valid
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data); 
                      document.getElementById("confirmation-message").innerHTML = "Customer created!";
                    })
                    .catch((error) => {
                      console.error("Error creating customer:", error);
                    });
                    break;
            }
            case "hotel":{
                
                const hotel_name = document.getElementById("hotel_name").value;
                const hotel_chain_name= document.getElementById("hotel-chain").value;   
                const address = document.getElementById("address").value;
                const category = document.getElementById("category").value;  
                const manager_ssn= document.getElementById("manager-ssn").value;     
                const email = document.getElementById("email").value;  

                fetch('/api/hotels', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ hotel_name, hotel_chain_name, address, category, manager_ssn, email}), // Ensure userId is valid
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data); 
                      document.getElementById("confirmation-message").innerHTML = "Hotel created!";
                    })
                    .catch((error) => {
                      console.error("Error creating hotel:", error);
                    });
                    break;
            }
            case "room":{

                const roomId = document.getElementById("room_id").value;
                const room_hotel_name = document.getElementById("hotel_name").value;
                const room_hotel_chain_name= document.getElementById("hotel_chain_name").value;   
                const room_hotel_address= document.getElementById("hotel_address").value;   
                const price = document.getElementById("price").value;
                const capacity = document.getElementById("capacity").value;  
                const view= document.getElementById("view").value;     
                const extension = document.getElementById("extension").value; 

                fetch('/api/rooms', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({roomId, room_hotel_name, room_hotel_address, room_hotel_chain_name, price, capacity, view, extension}), // Ensure userId is valid
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data); 
                    document.getElementById("confirmation-message").innerHTML = "Room created!";
                 })
                .catch((error) => {
                    console.error("Error creating room:", error);
                });
            } 
        }
    });

    buttonUpdate.addEventListener("click", function (){
        console.log(datatype);
        switch (datatype.toLowerCase()){
            case "employee":{
                const newssn = document.getElementById("ssn").value;
                const firstName = document.getElementById("first_name").value;
                const lastName = document.getElementById("last_name").value;
                const position = document.getElementById("position").value;

                elementID = new URLSearchParams(window.location.search).get("ssn");
                fetch(`/api/employees/${elementID}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({newssn, firstName, lastName, position})
                }).then(response => response.json())
                  .then(() => {document.getElementById("confirmation-message").innerHTML = `Employee updated successfully!` })
                  .catch(error => console.error('Error:', error));
                  break;
            }
            case "customer":{
                const firstName = document.getElementById("first_name").value;
                const lastName = document.getElementById("last_name").value; 

                elementID = new URLSearchParams(window.location.search).get("id");
                fetch(`/api/customers/${elementID}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({firstName, lastName})
                }).then(response => response.json())
                  .then(() => {document.getElementById("confirmation-message").innerHTML = `Customer updated successfully!`})
                  .catch(error => console.error('Error:', error));
                  break;
            }
            case "hotel":{
                const hotel_name = document.getElementById("hotel_name").value;
                const hotel_chain_name= document.getElementById("hotel_chain_name").value;   
                const address = document.getElementById("address").value;
                const category = document.getElementById("category").value;  
                const manager_ssn= document.getElementById("manager-ssn").value;     
                const email = document.getElementById("email").value;  

                elementID = new URLSearchParams(window.location.search).get("name");
                fetch(`/api/hotels/${elementID}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({hotel_name, hotel_chain_name, address, category, manager_ssn, email})
                }).then(response => response.json())
                  .then(() => {document.getElementById("confirmation-message").innerHTML = `Hotel updated successfully!` })
                  .catch(error => console.error('Error:', error));
                  break;
            }
            case "room":{
                const price = document.getElementById("price").value;
                const capacity = document.getElementById("capacity").value;  
                const view= document.getElementById("view").value;     
                const extension = document.getElementById("extension").value; 
                elementID = new URLSearchParams(window.location.search).get("room_id");
                fetch(`/api/rooms/${elementID}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({price, capacity, view, extension})
                }).then(response => response.json())
                  .then(() => {document.getElementById("confirmation-message").innerHTML = `Room updated successfully!` })
                  .catch(error => console.error('Error:', error));
            }
        }
    });

    buttonDelete.addEventListener("click", function (){
        switch (datatype){
            case "Employee":{
                const loggedEmployee = new URLSearchParams(window.location.search).get("logged")
                elementID = new URLSearchParams(window.location.search).get("ssn");
                if(loggedEmployee===elementID){
                    alert("You can't delete a logged in employee. Please logout and retry.")
                    break;
                } else {
                    fetch(`/api/employees/${elementID}`, {
                        method: 'DELETE'
                    }).then(response => response.json())
                    .then(() => { alert(`Employee deleted successfully!`); window.location.href=`employee.html?logged=${new URLSearchParams(window.location.search).get("logged")}`; })
                    .catch(error => console.error('Error:', error));
                    break;
                    }
                }
            case "Customer":{
                elementID = new URLSearchParams(window.location.search).get("id");
                fetch(`/api/customers/${elementID}`, {
                    method: 'DELETE'
                }).then(response => response.json())
                .then(() => { alert(`Customer deleted successfully!`); window.location.href=`employee.html?logged=${new URLSearchParams(window.location.search).get("logged")}`; })
                .catch(error => console.error('Error:', error));
                break;}
            case "Hotel":{
                elementID = new URLSearchParams(window.location.search).get("name");
                fetch(`/api/hotels/${elementID}`, {
                    method: 'DELETE'
                }).then(response => response.json())
                .then(() => { alert(`Hotel deleted successfully!`); window.location.href=`employee.html?logged=${new URLSearchParams(window.location.search).get("logged")}`; })
                .catch(error => console.error('Error:', error));
                break;}
            case "Room":{
                elementID = new URLSearchParams(window.location.search).get("id");
                fetch(`/api/rooms/${elementID}`, {
                    method: 'DELETE'
                }).then(response => response.json())
                .then(() => { alert(`Room deleted successfully!`); window.location.href=`employee.html?logged=${new URLSearchParams(window.location.search).get("logged")}`; })
                .catch(error => console.error('Error:', error));
            }
        }
    })

    document.getElementById("go-back").addEventListener("click", function () {
      window.location.href=`employee.html?logged=${new URLSearchParams(window.location.search).get("logged")}`;
    });
});
