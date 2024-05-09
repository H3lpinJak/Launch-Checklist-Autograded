// Write your JavaScript code here!


window.addEventListener("load", async function() {
    let listedPlanets;
    try {
        // Await the result of myFetch
        listedPlanets = await myFetch();

        // Pick a random planet
        const pickedPlanet = pickPlanet(listedPlanets);

        // Add destination information after fetching planet data and selecting a random planet
        addDestinationInfo(
            document,
            pickedPlanet.name,
            pickedPlanet.diameter,
            pickedPlanet.star,
            pickedPlanet.distance,
            pickedPlanet.moons,
            pickedPlanet.imageUrl
        );
    } catch (error) {
        console.error('Error fetching or processing planet data:', error);
        // Handle the error as needed
    }

    // Find the button element
    const formSubmit = document.getElementById("formSubmit");

    // Add event listener to the button
    formSubmit.addEventListener("click", function(event) {
        event.preventDefault();
        // Retrieve input values
        const pilotInput = document.getElementById("pilotName").value;
        const copilotInput = document.querySelector('input[name="copilotName"]').value;
        const fuelInput = document.querySelector('input[name="fuelLevel"]').value;
        const cargoInput = document.querySelector('input[name="cargoMass"]').value;

        // Call formSubmission with input values
        formSubmission(document, listedPlanets, pilotInput, copilotInput, fuelInput, cargoInput);
    });
});