document.addEventListener("DOMContentLoaded", function () {
  const roomId = new URLSearchParams(window.location.search).get("id");
  const bookingButton = document.getElementById("book-now");
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const totalCostDisplay = document.getElementById("total-cost");

  fetch(`/api/rooms/${roomId}`)
    .then((response) => response.json())
    .then((roomDetails) => {
      const pricePerNight = parseFloat(roomDetails.price);
      console.log(roomDetails); 
      document.getElementById("room-id").textContent = roomDetails.id;
      document.getElementById("hotel-chain").textContent = roomDetails.hotel_chain_name;
      document.getElementById("hotel").textContent = roomDetails.hotel_name;
      console.log(roomDetails.hotel_address);
      document.getElementById("address").textContent = roomDetails.hotel_address;
      document.getElementById("price").textContent = roomDetails.price;
      document.getElementById("capacity").textContent = roomDetails.capacity;

      bookingButton.disabled = false;

      startDateInput.addEventListener("change", calculateTotalCost);
      endDateInput.addEventListener("change", calculateTotalCost);

      function calculateTotalCost() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        if (startDate && endDate && endDate > startDate) {
          const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
          const totalCost = nights > 0 ? nights * pricePerNight : 0;
          totalCostDisplay.textContent = totalCost.toFixed(2);
          bookingButton.disabled = false; 
        } else {
          totalCostDisplay.textContent = "0";
          bookingButton.disabled = true;
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching room details:", error);
    });

  bookingButton.addEventListener("click", function () {
    if (!startDateInput.value || !endDateInput.value) {
        alert("Please fill out start and end date.");
        return;
    }
    const hotel_chain = document.getElementById("hotel-chain").textContent;
    const hotel = document.getElementById("hotel").textContent;
    const address = document.getElementById("address").textContent;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;

    fetch('/api/bookings', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, hotel, address, hotel_chain, startDate, endDate, firstName, lastName}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        document.getElementById("booking-message").textContent = "Booking confirmed!";
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });
  });

  document.getElementById("go-back").addEventListener("click", function () {
    window.history.back();
  });
});
