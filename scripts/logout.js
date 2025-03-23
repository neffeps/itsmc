function logout() {
    fetch("https://neffeps.x10.mx/api/logout.php", {
		method: "POST",
    	credentials: "include"
	})
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "https://neffeps.github.io/itsmc/pages/login.htm";
            } else {
                console.error("Błąd podczas wylogowania:", data.error);
            }
        })
        .catch(error => console.error("Błąd połączenia:", error));
    }