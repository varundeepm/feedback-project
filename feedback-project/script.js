document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("status");
    status.innerText = "Submitting...";

    try {
        const res = await fetch("https://feedback-project-1-jp73.onrender.com/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message })
        });

        if (res.ok) {
            status.innerText = "Feedback submitted!";
            document.getElementById("feedbackForm").reset();
            alert("Feedback submitted successfully!");
        } else {
            status.innerText = "Error submitting!";
            alert("Error submitting feedback!");
        }
    } catch (err) {
        status.innerText = "Network error!";
        alert("Network error, try again!");
    }
});
