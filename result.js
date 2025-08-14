document.addEventListener("DOMContentLoaded", function() {
    const cifDisplay = document.getElementById("cifDisplay");

    const params = new URLSearchParams(window.location.search);
    const cif = params.get("cif");

    if (cif) {
        cifDisplay.textContent = `You searched for CIF number: ${cif}`;
    } else {
        cifDisplay.textContent = "No CIF number provided.";
    }
});
