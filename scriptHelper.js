// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                    <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    testInput = String(testInput);
    if (testInput.trim() === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = validateInput(pilot);
    let coPilotStatus = validateInput(copilot);
    let fuelStatus = validateInput(fuelLevel);
    let cargoStatus = validateInput(cargoLevel);

    if (pilotStatus === "Empty" || coPilotStatus === "Empty" || fuelStatus === "Empty" || cargoStatus === "Empty") {
        alert("All fields are required!")
        return;
    } else if (pilotStatus === "Is a Number" || coPilotStatus === "Is a Number") {
        alert("Pilot and Co-Pilot name should be a string!");
        return;
    } else if (fuelStatus !== "Is a Number" || cargoStatus !== "Is a Number") {
        alert("Fuel level and cargo mass should be numbers!");
        return;
    }

    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
    list.style.visibility = "visible";
    let launchStatus = "Shuttle is Ready for Launch"
    let launchColor = "green"

    if (Number(fuelLevel) < 10000 || Number(cargoLevel) > 10000) {
        launchStatus = "Shuttle Not Ready for Launch";
        launchColor = 'red';
    }

    document.getElementById("fuelStatus").innerHTML = (Number(fuelLevel) < 10000) ? "Fuel level too low for launch" : "Fuel level high enough for launch";
    document.getElementById("cargoStatus").innerHTML = (Number(cargoLevel) > 10000) ? "Cargo mass too heavy for launch" : "Cargo mass low enough for launch";

    document.getElementById("launchStatus").innerHTML = launchStatus;
    document.getElementById("launchStatus").style.color = launchColor;
};

async function myFetch() {
    try {
        const response = await fetch("https://handlers.education.launchcode.org/static/planets.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const planetsReturned = await response.json();
        return planetsReturned;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

function pickPlanet(planets) {
    const randomPlanet = Math.floor(Math.random() * planets.length);
    return planets[randomPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;