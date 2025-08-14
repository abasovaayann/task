document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById("searchBtn");
    const cifInput = document.getElementById("cifInput");
    const errorMessage = document.getElementById("errorMessage");

    searchBtn.addEventListener("click", function() {
        const cif = cifInput.value.trim();

        if (cif === "") {
            errorMessage.textContent = "Please enter a CIF.";
            return;
        }

        // Redirect to results page
        window.location.href = `results.html?cif=${encodeURIComponent(cif)}`;
    });
});
