document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    document.getElementById("status").innerText = "Submitting...";

    try {
        const res = await fetch("https://your-api-name.onrender.com/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message })
        });

        if (res.ok) {
            document.getElementById("status").innerText = "Feedback submitted!";
            document.getElementById("feedbackForm").reset();
        } else {
            document.getElementById("status").innerText = "Error submitting!";
        }
    } catch (err) {
        document.getElementById("status").innerText = "Network error!";
    }
});
