let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


function updateNavbar() {
 const profileDropdown = document.getElementById("profile-dropdown");
 const loginButton = document.getElementById("login-btn");


 if (isLoggedIn) {
   profileDropdown.style.display = "block";
   loginButton.style.display = "none";
 } else {
   profileDropdown.style.display = "none";
   loginButton.style.display = "block";
 }
}


function handleLogout() {
 isLoggedIn = false;
 localStorage.setItem("isLoggedIn", "false"); 
 updateNavbar();
 window.location.href = "index.html";
}


document.getElementById("logout-btn")?.addEventListener("click", handleLogout);


function handleBooking(event) {
 if (!isLoggedIn) {
   event.preventDefault(); 
   alert("Please login first to book a room.");
   window.location.href = "login.html"; 
 }
}


document.querySelectorAll(".book-btn").forEach((button) => {
 button.addEventListener("click", handleBooking);
});


document.addEventListener("DOMContentLoaded", function () {
 updateNavbar();
});




document.addEventListener("DOMContentLoaded", function () {
 const form = document.getElementById("availability-form");
 const resultsContainer = document.createElement("div");
 resultsContainer.classList.add("results-container");
 form.parentNode.appendChild(resultsContainer);


 form.addEventListener("submit", function (event) {
     event.preventDefault();


     const roomCapacity = document.getElementById("room-capacity").value;
     const area = document.getElementById("area").value;
     const hotelChain = document.getElementById("hotel-chain").value;
     const category = document.getElementById("category").value;
     const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
     const maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;


    fetch('/api/rooms')
        .then(response => response.json())
        .then(rooms => {
            const filteredRooms = rooms.filter(room =>
                (roomCapacity === "any" || room.capacity === parseInt(roomCapacity)) &&
                (area === "any" || room.location === area) &&
                (hotelChain === "any" || room.hotel_chain_name === hotelChain) &&
                (category === "any" || room.stars === category) &&
                room.price >= minPrice &&
                room.price <= maxPrice
            );

        })
        .catch(error => {
            console.error("Error fetching rooms:", error);
        });



        const filteredRooms = rooms.filter(room =>
            (roomCapacity === "any" || room.capacity === parseInt(roomCapacity)) &&
            (area === "any" || room.location === area) &&
            (hotelChain === "any" || room.chain === hotelChain) &&
            (category === "any" || room.stars === category) &&
            room.price >= minPrice &&
            room.price <= maxPrice
        );


     resultsContainer.innerHTML = "";


     if (filteredRooms.length === 0) {
         resultsContainer.innerHTML = "<p>No rooms found matching your criteria.</p>";
     } else {
         let tableHTML = `<table class="room-table">
             <thead>
                 <tr>
                     <th>Room ID</th>
                     <th>Hotel Chain</th>
                     <th>Stars</th>
                     <th>Location</th>
                     <th>Price ($)</th>
                     <th>Capacity</th>
                     <th>Action</th>
                 </tr>
             </thead>
             <tbody>`;


         filteredRooms.forEach(room => {
             tableHTML += `
                 <tr>
                     <td>${room.id}</td>
                     <td>${room.chain}</td>
                     <td>${room.stars}</td>
                     <td>${room.location}</td>
                     <td>${room.price}</td>
                     <td>${room.capacity}</td>
                     <td>
                         <a href="room-details.html?id=${room.id}&chain=${room.chain}&stars=${room.stars}&location=${room.location}&price=${room.price}&capacity=${room.capacity}"
                            class="btn book-btn">Book Now</a>
                     </td>
                 </tr>
             `;
         });


         tableHTML += `</tbody></table>`;
         resultsContainer.innerHTML = tableHTML;
     }
 });
});
