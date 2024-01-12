// Function to predict gender based on name
function predictGender() {

    let name = document.getElementById('name').value;
    console.log(`Name is ${name}`);

    // URL of the gender prediction API
    const apiUrl = `https://api.genderize.io/?name=${name}`;

    // Using the fetch function to send a GET request to the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            console.log(`response is ${response}`)
            return response.json();
        })
        .then(data => {
            // Display the saved Answer
            displaySavedAnswer(data.name)
            // Display the result to the user
            displayPrediction(data);
        })
        .catch(error => {
            console.error(`Error fetching data: ${error}`);
        });

}

// Function to display the gender prediction result
function displayPrediction(data) {
    // Extract relevant information from the response
    const name = data.name;
    const gender = data.gender;
    const probability = data.probability;

    const ansElement = document.getElementById('ans');

    ansElement.innerHTML = `${name} is ${gender}`;

    // Display the result to the user (you can customize this part based on your UI)
    console.log(`Name: ${name}`);
    console.log(`Gender: ${gender}`);
    console.log(`Probability: ${probability}`);
}

function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the input value
    const inputName = document.getElementById('name').value;

    // Call the predictAndSaveGender function with the input value
    predictGender(inputName);
}

function saveUserInput() {
    // Get the values from the form
    const nameInput = document.getElementById('name');
    const genderInputs = document.getElementsByName('gender');

    // Validate if the name is not empty
    const name = nameInput.value.trim();
    if (!name) {
        alert('Please enter a name before saving.');
        return;
    }

    // Validate if a gender option is selected
    let selectedGender = '';
    for (const genderInput of genderInputs) {
        if (genderInput.checked) {
            selectedGender = genderInput.value;
            break;
        }
    }

    if (!selectedGender) {
        alert('Please select a gender before saving.');
        return;
    }

    // Create an object to represent the user input
    const userInput = {
        name,
        gender: selectedGender,
    };

    // Save the user input to localStorage
    saveUserInputToLocalStorage(userInput);

    // Optionally, you can reset the form after saving
    document.getElementById('genderPredictionForm').reset();

    // Provide feedback to the user (you can customize this part)
    alert('User input saved successfully!');
}

function saveUserInputToLocalStorage(userInput) {
    // Retrieve existing saved user inputs from localStorage
    const savedUserInputs = JSON.parse(localStorage.getItem('savedUserInputs')) || [];

    // Find the index of the saved data for the specified name
    const dataIndex = savedUserInputs.findIndex(item => item.name === userInput.name);

    if (dataIndex !== -1) {
        // Remove the data for the specified name
        savedUserInputs.splice(dataIndex, 1);
    }

    // Add the new user input to the array
    savedUserInputs.push(userInput);

    // Save the updated user inputs back to localStorage
    localStorage.setItem('savedUserInputs', JSON.stringify(savedUserInputs));
}

function displaySavedAnswer(name) {
    // Retrieve existing saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('savedUserInputs')) || [];
    console.log(`Saved answer is ${JSON.stringify(savedData, null, 2)}`)

    // Find the saved data for the specified name
    const savedAnswer = savedData.find(item => item.name === name);

    if (savedAnswer) {
        // Get the elements in the HTML structure
        const savedAnswerContainer = document.querySelector('.saved-answer-container');
        const savedAnswerParagraph = savedAnswerContainer.querySelector('p');

        // Update the HTML content with the saved answer
        savedAnswerParagraph.textContent = `${savedAnswer.name} -> ${savedAnswer.gender}`;
        savedAnswerContainer.style.display = 'block'; // Show the container
    }
}

function clearSavedAnswer() {
    // Get the value from the 'name' input field
    const nameInput = document.getElementById('name');
    const name = nameInput.value;

    // Clear the displayed answer
    const savedAnswerContainer = document.querySelector('.saved-answer-container');
    const savedAnswerParagraph = savedAnswerContainer.querySelector('p');
    // savedAnswerContainer.style.display = 'none'; // Hide the container
    savedAnswerParagraph.textContent = "";

    // Retrieve existing saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('savedUserInputs')) || [];

    // Find the index of the saved data for the specified name
    const dataIndex = savedData.findIndex(item => item.name === name);

    if (dataIndex !== -1) {
        // Remove the data for the specified name
        savedData.splice(dataIndex, 1);

        // Save the updated data back to localStorage
        localStorage.setItem('savedUserInputs', JSON.stringify(savedData));
    }
}




