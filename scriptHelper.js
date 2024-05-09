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
        console.log("All fields are required!")
        return;
    } else if (pilotStatus !== "Is a Number" || coPilotStatus !== "Is a Number") {
        console.log("Pilot and Co-Pilot name should be a string!");
        return;
    } else if (fuelStatus !== "Is a Number" || cargoStatus !== "Is a Number") {
        console.log("Fuel level and cargo mass should be numbers!");
        return;
    }

    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} Ready`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} Ready`;

    if (Number(fuelLevel) < 10000) {
        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
        document.getElementById("cargoStatus").innerHTML = ""; 
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = 'red';
        document.getElementById("faultyItems").style.visibility = "visible";

        document.getElementById("launchChecklist").style.display = "block";
        document.getElementById("fuelCheck").innerHTML = "✔️ Fuel Level above 10,000 liters";
        document.getElementById("cargoCheck").innerHTML = "❌ Cargo Mass within acceptable range";

        return;
    }

    if (Number(cargoLevel) > 10000) {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
        document.getElementById("fuelStatus").innerHTML = ""; 
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = 'red';
        document.getElementById("faultyItems").style.visibility = "visible";
        
        document.getElementById("launchChecklist").style.display = "block";
        document.getElementById("fuelCheck").innerHTML = "❌ Fuel Level above 10,000 liters";
        document.getElementById("cargoCheck").innerHTML = "✔️ Cargo Mass within acceptable range";

        return;
    }

    // Reset both fuel and cargo status if neither condition is met
    document.getElementById("fuelStatus").innerHTML = "";
    document.getElementById("cargoStatus").innerHTML = "";
    document.getElementById("faultyItems").style.visibility = "visible";
    // If everything is good, set the launch status to "Shuttle is ready for launch"
    document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
    document.getElementById("launchStatus").style.color = "green";
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