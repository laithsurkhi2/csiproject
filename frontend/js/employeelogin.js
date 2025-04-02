document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const ssn = document.getElementById("ssn").value;
    const password = document.getElementById("password").value;

    fetch("/api/employee/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ssn, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = `employee.html?ssn=${ssn}`; // Redirect to employee information page
        } else {
            document.getElementById("login-message").textContent = data.message; // Show error message
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
    });
});
