document.getElementById("search-input").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "";

    firebase.database().ref("users").once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const username = childSnapshot.key.toLowerCase();
            if (username.includes(query)) {
                const li = document.createElement("li");
                li.textContent = childSnapshot.key;
                li.addEventListener("click", function() {
                    window.location.href = `chat.html?user=${childSnapshot.key}`; // Redirect to chat page with selected user
                });
                resultsContainer.appendChild(li);
            }
        });
    });
});
