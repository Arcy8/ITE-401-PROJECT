const locationInput = document.getElementById("locationInput");
const addLocationButton = document.getElementById("addLocationButton");
const locationsList = document.getElementById("locationsList");
let locationsArray = [];
let map;


window.onload = function() {
    map = L.map("map").setView([13.41, 122.56], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);
};

addLocationButton.addEventListener("click", addLocation);

function addLocation() {
    const location = locationInput.value.trim();
    if (location !== "") {
        locationsArray.push(location);
        locationInput.value = "";
        updateLocationsList();
        updateMap(location);
    }
}

function updateLocationsList() {
    locationsList.innerHTML = "";
    locationsArray.forEach((location) => {
        const li = document.createElement("li");
        li.textContent = location;
        li.addEventListener("click", () => updateMap(location));
        locationsList.appendChild(li);
    });
}

function updateMap(location) {
    const coordinates = getCoordinatesForLocation(location);
    if (coordinates) {
        map.setView(coordinates, 6);  // Adjust the zoom level to 6
        L.marker(coordinates).addTo(map).bindPopup(location);
    } else {
        alert("Location not found or coordinates not available");
    }
}

function getCoordinatesForLocation(location) {
    const locationCoordinates = {
        "philippines": [13.41, 122.56],
        "taiwan": [23.697809, 120.960518],
        "manila": [14.599512, 120.984222],
        "iloilo": [10.720150, 122.562103],
    };
    return locationCoordinates[location.toLowerCase()];
}
