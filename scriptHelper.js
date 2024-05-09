// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                    <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    `
}

function validateInput(testInput) {
    if (testInput.trim() === "") {
        return "Empty";
    } else if (isNaN()) {
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
    } else if (pilotStatus !== "Is a Number" || coPilotStatus !== "Is a Number") {
        alert("Pilot and Co-Pilot name should be a string!");
        return;
    } else if (fuelStatus !== "Is a Number" || cargoStatus !== "Is a Number") {
        alert("Fuel level and cargo mass should be numbers!");
        return;
    }

    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} Ready`;
    document.getElementById("coPilotStatus").innerHTML = `Co-Pilot ${copilot} Ready`;

    if (fuelLevel < 10000) {
        document.getElementById("faultyitems").style.visibility = "visible";
        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = 'red';
        return;
    }

    if (cargoLevel > 10000) {
        document.getElementById("faultyitems").style.visibility = "visible";
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = 'red';
        return;
    }

    document.getElementById("faultyitems").style.visibility = "hidden";
    document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
    document.getElementById("launchStatus").style.color = "green";
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
    });

    return planetsReturned;
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