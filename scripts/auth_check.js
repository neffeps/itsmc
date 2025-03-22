function auth_check() {
    fetch("/itsmc/api/auth_check.php")
        .then(response => response.json())
        .then(data => {
            if (!data.auth) {
                window.location.href = "/itsmc/pages/login.htm";
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