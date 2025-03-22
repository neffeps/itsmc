function logout() {
    fetch("https://neffeps.42web.io/api/logout.php", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "/itsmc/pages/login.htm"; // Przekierowanie
            } else {
                console.error("Błąd podczas wylogowania:", data.error);
            }
        })
        .catch(error => console.error("Błąd połączenia:", error));
    }