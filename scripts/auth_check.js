function auth_check() {
    fetch("https://neffeps.x10.mx/api/auth_check.php", {
		method: "GET",
    	credentials: "include"
	})
        .then(response => response.json())
        .then(data => {
            if (!data.auth) {
                window.location.href = "https://neffeps.github.io/itsmc/pages/login.htm";
            }
            else {
                username = data.username;
                firstUsernameLetter = username.charAt(0);
                bigFirstUsernameLetter = firstUsernameLetter.toUpperCase();
                const userAvatar = document.getElementById("userAvatar");
                userAvatar.textContent = bigFirstUsernameLetter;
            }
        })
        .catch(error => console.error("Brak autoryzacji: ", error));
    }