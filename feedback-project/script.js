document.getElementById("feedbackForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const feedback = document.getElementById("feedback").value;

    // Your Render backend API
    const apiURL = "https://feedback-project-1-jp73.onrender.com/feedback";

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, feedback }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Feedback submitted successfully!");
            document.getElementById("feedbackForm").reset();
        } else {
            alert("Error: " + result.error);
        }
    } catch (error) {
        console.error("Request failed:", error);
        alert("Unable to connect to server. Please try again later.");
    }
});
