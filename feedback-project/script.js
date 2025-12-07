document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("feedback").value;

    document.getElementById("status").innerText = "Submitting...";

    try {
        const res = await fetch("https://feedback-project-1-jp73.onrender.com/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message })
        });

        const data = await res.json();

        if (data.success) {
            document.getElementById("status").innerText = "Feedback submitted!";
            document.getElementById("feedbackForm").reset();
        } else {
            document.getElementById("status").innerText = "Error!";
        }

    } catch (err) {
        document.getElementById("status").innerText = "Network error!";
    }
});
