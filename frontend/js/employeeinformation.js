document.addEventListener("DOMContentLoaded", function() {
    // Fetch employee details from the server
    fetch("/api/employee/details", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("employee-details").textContent = 
                `SSN: ${data.employee.ssn}, Name: ${data.employee.first_name} ${data.employee.last_name}, Position: ${data.employee.position}, Hotel: ${data.employee.hotel_name}`;
        } else {
            document.getElementById("employee-details").textContent = data.message; // Show error message
        }
    })
    .catch(error => {
        console.error("Error fetching employee details:", error);
    });

    document.getElementById("view-bookings").addEventListener("click", function() {
        window.location.href = "employee.html"; // Redirect to employee bookings page
    });
});
