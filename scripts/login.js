document.addEventListener("DOMContentLoaded", getUsers);

function getUsers() {
    fetch("https://cors-anywhere.herokuapp.com/https://neffeps.42web.io/api/users.php")
        .then(response => response.json())
        .then(data => {
            const usernameSelect = document.getElementById("usernameSelect");
            data.forEach(user => {
                const option = document.createElement("option");
                option.value = user.username;
                option.textContent = user.username;
                usernameSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Błąd pobierania listy użytkowników: ", error));
}

function login() {
    const username = document.getElementById("usernameSelect").value;
    const password = document.getElementById("passwordInput").value;

    fetch("https://neffeps.42web.io/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "/itsmc/pages/internal_repairs.htm";
        }
        else {
            document.getElementById("loginError").textContent = data.error;
        }
    })
    .catch(error => console.error("Błąd logowania: ", error));
}
