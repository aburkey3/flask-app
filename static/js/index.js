// JS for AVN Test

const baseURL = document.URL
setup()

// Attach event listeners to the buttons
function setup() {
    document.getElementById("save-button").addEventListener("click", saveText)
    document.getElementById("load-button").addEventListener("click", loadText)
}

// Save the text input, clear the text box, and send the input to the /save endpoint
async function saveText() {
    let textInput = document.getElementById("text-entry").value
    document.getElementById("text-entry").value = ""

    if (textInput === "") {
        setAlert("visible")
        return
    }
    else {
        setAlert("hidden")
        const response = await fetch(`${baseURL}/save`, { 
            method: "POST",
            body: JSON.stringify({
                text: textInput 
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        if (!response.ok) 
            throw new Error("Error when saving text input")
    }
}

// Load saved text from the backend
async function loadText() {
    setAlert("hidden")
    document.getElementById("text-contents").innerHTML = ""
    const response = await fetch(`${baseURL}/load`)
    if (!response.ok)
        throw new Error("Error when loading text")

    const data = await response.json()
    for (item of data.list)
        document.getElementById("text-contents").innerHTML += `<p>${item}\n</p>`
}

// Hide or reveal alert
function setAlert(value) {
    document.getElementById("alert").style.visibility = value
}