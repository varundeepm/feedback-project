document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    document.getElementById("status").innerText = "Submitting...";

    try {
        const res = await fetch("https://feedback-project-1-jp73.onrender.com/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message })
        });

        const data = await res.json();
        console.log("Backend response:", data);

        if (res.ok) {
            document.getElementById("status").innerText = "Feedback submitted!";
            document.getElementById("feedbackForm").reset();
        } else {
            document.getElementById("status").innerText = "Error submitting feedback!";
        }

    } catch (err) {
        console.error("Network error:", err);
        document.getElementById("status").innerText = "Network error!";
    }
});
