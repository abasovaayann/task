document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById("searchBtn");
    const cifInput = document.getElementById("cifInput");
    const errorMessage = document.getElementById("errorMessage");
    const loading = document.getElementById("loading");
    const textSection=document.querySelector(".text");

    let customers=[];
    fetch("customers.json")
    .then(response => response.json())
    .then(data => {
        customers = data;
    })
    .catch(error => {
        console.error("Error fetching customer data:", error);
    });

    searchBtn.addEventListener("click", function() {
        const cif = cifInput.value.trim();

        // Validate CIF: not empty, at least 8 digits, numeric
        if (cif === "" || cif.length < 8 || isNaN(cif)) {
           errorMessage.textContent = "Please enter a valid CIF.";
            return;
        }


        const customer = customers.find(c => c.cif === cif);

        if(!customer){
            errorMessage.textContent = "CIF not found.";
            return;
        }

        localStorage.setItem("selectedCustomer", JSON.stringify(customer));

        // Hide button and show loading
        [...textSection.children].forEach(child => {
            if (child !== loading) {
                child.style.display = "none";
            }
        });
        loading.style.display = "flex";

        // Redirect after 1 second
        setTimeout(() => {
            window.location.href = `result.html?cif=${encodeURIComponent(cif)}`;
        }, 1000);
    });
});
