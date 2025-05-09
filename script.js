document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const suggestionsDiv = document.getElementById("suggestions");
    const body = document.body;

    // Create Find Me button
    const findMeButton = document.createElement("button");
    findMeButton.textContent = "Find Me";
    findMeButton.style.marginLeft = "0px";
    findMeButton.style.width = "27%";
    findMeButton.style.color = "white";
    findMeButton.style.backgroundColor = "green";
    findMeButton.style.fontWeight = "bold";
    findMeButton.style.padding = "5px";
    findMeButton.addEventListener("mouseover", () => {
        findMeButton.setAttribute("title", "Find your current location");
    });

    findMeButton.addEventListener("mouseout", () => {
        findMeButton.removeAttribute("title");
    });
    document.querySelector(".currentlocation").appendChild(findMeButton);

    // Create Mark Location button
    const markLocationButton = document.createElement("button");
    markLocationButton.addEventListener("mouseover", () => {
        markLocationButton.setAttribute("title", "Find your location on map");
    });

    markLocationButton.addEventListener("mouseout", () => {
        markLocationButton.removeAttribute("title");
    });
    document.querySelector(".currentlocation").appendChild(findMeButton);
    markLocationButton.textContent = "Map Location";
    markLocationButton.style.backgroundColor = "green";
    markLocationButton.style.color = "white";
    markLocationButton.style.fontWeight = "bold";
    markLocationButton.style.padding = "5px";
    markLocationButton.style.cursor = "pointer";
    markLocationButton.style.width = "60%";
    markLocationButton.style.overflowY = "auto";
    markLocationButton.style.border = "none";
    markLocationButton.style.marginLeft = "10px";
    markLocationButton.style.marginTop = "20px";
    document.querySelector(".currentlocation").appendChild(markLocationButton);

    // Loading overlay
    const loadingOverlay = document.createElement("div");
    loadingOverlay.style.position = "fixed";
    loadingOverlay.style.top = "0";
    loadingOverlay.style.left = "0";
    loadingOverlay.style.width = "100%";
    loadingOverlay.style.height = "100%";
    loadingOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    loadingOverlay.style.display = "none";
    loadingOverlay.style.justifyContent = "center";
    loadingOverlay.style.alignItems = "center";
    loadingOverlay.style.zIndex = "1000";
    const loadingIcon = document.createElement("div");
    loadingIcon.style.border = "5px solid #f3f3f3";
    loadingIcon.style.borderTop = "5px solid green";
    loadingIcon.style.borderRadius = "50%";
    loadingIcon.style.width = "50px";
    loadingIcon.style.height = "50px";
    loadingIcon.style.animation = "spin 1s linear infinite";
    loadingOverlay.appendChild(loadingIcon);
    body.appendChild(loadingOverlay);

    // Add loading spinner animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Show suggestions based on input
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        suggestionsDiv.innerHTML = ""; // Clear previous suggestions
        if (query) {
            const suggestions = [
                "Mumbai", "New Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Lucknow",
                "Agra", "Varanasi", "Shimla", "Manali", "Goa", "Udaipur", "Jodhpur", "Amritsar", "Rishikesh", "Haridwar",
                "Darjeeling", "Gangtok", "Mysore", "Ooty", "Coorg", "Leh", "Ladakh", "Srinagar", "Gulmarg", "Pondicherry",
                "Bhopal", "Indore", "Nagpur", "Surat", "Vadodara", "Patna", "Ranchi", "Bhubaneswar", "Guwahati", "Shillong",
                "Thiruvananthapuram", "Kochi", "Alleppey", "Munnar", "Kanyakumari", "Madurai", "Tirupati", "Ajmer", "Pushkar",
                "Jaisalmer", "Mount Abu", "Chandigarh", "Dehradun", "Nainital", "Mussoorie", "Lonavala", "Mahabaleshwar",
                "Aurangabad", "Hampi", "Khajuraho", "Ranthambore", "Kaziranga", "Sundarbans", "Andaman and Nicobar Islands"
            ]; // Indian states, capitals, and popular tourist cities
            const filteredSuggestions = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query)
            );
            filteredSuggestions.forEach(suggestion => {
                const suggestionItem = document.createElement("div");
                suggestionItem.textContent = suggestion;
                suggestionItem.style.backgroundColor = "green";
                suggestionItem.style.color = "white";
                suggestionItem.style.fontWeight = "bold";
                suggestionItem.style.padding = "5px";
                suggestionItem.style.cursor = "pointer";
                suggestionItem.style.width = "40%";
                suggestionItem.style.overflowY = "auto";
                suggestionItem.addEventListener("click", () => {
                    searchInput.value = suggestion;
                    suggestionsDiv.innerHTML = ""; // Clear suggestions
                });
                suggestionsDiv.appendChild(suggestionItem);
            });
        }
    });

    // Find Me button functionality
    findMeButton.addEventListener("click", () => {
        loadingOverlay.style.display = "flex";
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                fetch(geocodeUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.display_name) {
                            searchInput.value = data.display_name;
                        } else {
                            alert("Unable to retrieve address.");
                        }
                        loadingOverlay.style.display = "none";
                    })
                    .catch(() => {
                        alert("Error retrieving address.");
                        loadingOverlay.style.display = "none";
                    });
            },
            error => {
                alert("Unable to retrieve your location.");
                loadingOverlay.style.display = "none";
            }
        );
    });

    // Mark Location button functionality
    markLocationButton.addEventListener("click", () => {
        const newTab = window.open("https://www.google.com/maps", "_blank");
        const interval = setInterval(() => {
            if (newTab.closed) {
                clearInterval(interval);
                const markedLocation = prompt("Enter the marked location:");
                if (markedLocation) {
                    searchInput.value = markedLocation;
                }
            }
        }, 500);
    });
});

// Destination input field
// Reset button functionality
function resetSelections() {
    const destinationSelect = document.getElementById("dest");
    destinationSelect.value = "default";
}

// Set default value on page reload
document.addEventListener("DOMContentLoaded", () => {
    const destinationSelect = document.getElementById("dest");
    destinationSelect.value = "default";
});



// date field
// Restrict check-in and check-out dates
document.addEventListener("DOMContentLoaded", () => {
    const checkinInput = document.getElementById("checkindate");
    const checkoutInput = document.getElementById("checkoutdate");

    // Set minimum date for check-in to today
    const today = new Date().toISOString().split("T")[0];
    checkinInput.setAttribute("min", today);

    // Update minimum date for check-out based on check-in date
    checkinInput.addEventListener("change", () => {
        const checkinDate = new Date(checkinInput.value);
        if (checkinDate) {
            const nextDay = new Date(checkinDate);
            nextDay.setDate(nextDay.getDate() + 1);
            checkoutInput.setAttribute("min", nextDay.toISOString().split("T")[0]);
        }
    });

    // Ensure check-out date is at least one day after check-in
    checkoutInput.addEventListener("change", () => {
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);
        if (checkoutDate <= checkinDate) {
            alert("Check-out date must be at least one day after check-in date.");
            checkoutInput.value = "";
        }
    });
});
// Reset all input fields to default values on page reload
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const checkinInput = document.getElementById("checkindate");
    const checkoutInput = document.getElementById("checkoutdate");
    const destinationSelect = document.getElementById("dest");

    // Reset search input
    if (searchInput) searchInput.value = "";

    // Reset check-in and check-out dates
    if (checkinInput) checkinInput.value = "";
    if (checkoutInput) checkoutInput.value = "";

    // Reset destination select
    if (destinationSelect) destinationSelect.value = "default";
});

//login button change : exception

// Change login button to logout when user is logged in
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".login button");

    if (!loginButton) {
        console.error("Login button not found. Ensure the '.login button' selector is correct.");
        return;
    }

    // Check if user is logged in
    if (sessionStorage.getItem("user")) {
        loginButton.textContent = "Logout";
        loginButton.onclick = () => {
            sessionStorage.clear();
            alert("You have been logged out.");
            location.reload(); // Reload the page to reflect changes
        };
    } else {
        loginButton.textContent = "Login";
        loginButton.onclick = () => {
            const loginWindow = window.open('login.html', '_self');
            const interval = setInterval(() => {
                if (loginWindow.closed) {
                    clearInterval(interval);
                    if (sessionStorage.getItem("user")) {
                        window.location.href = "index.html"; // Redirect to index.html after login
                    }
                }
            }, 500);
        };
    }
});