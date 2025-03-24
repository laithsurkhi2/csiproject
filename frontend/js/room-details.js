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
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const userId = 1; // This should be dynamically set based on the logged-in user

    fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, startDate, endDate, userId }), // Ensure userId is valid
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
