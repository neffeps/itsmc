document.addEventListener("DOMContentLoaded", getUsers);

function getUsers() {
    showCurrentStatusPopup();
    fetch("https://neffeps.x10.mx/api/users.php", {
		method: "GET",
	})
        .then(response => response.json())
        .then(data => {
            hideCurrentStatusPopup();
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
    showCurrentStatusPopup();
    const username = document.getElementById("usernameSelect").value;
    const password = document.getElementById("passwordInput").value;

    fetch("https://neffeps.x10.mx/api/login.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        hideCurrentStatusPopup();
        if (data.success) {
            window.location.href = "https://neffeps.github.io/itsmc/pages/internal_repairs.htm";
        }
        else {
            document.getElementById("loginError").textContent = data.error;
        }
    })
    .catch(error => console.error("Błąd logowania: ", error));
}
