function logout() {
    fetch("neffeps.42web.io/api/logout.php", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "neffeps.42web.io/pages/login.htm"; // Przekierowanie
            } else {
                console.error("Błąd podczas wylogowania:", data.error);
            }
        })
        .catch(error => console.error("Błąd połączenia:", error));
    }