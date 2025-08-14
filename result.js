document.addEventListener("DOMContentLoaded", function () {
    const customerData = JSON.parse(localStorage.getItem("selectedCustomer"));
    const toggleDetails = document.getElementById("toggleDetails");
    const customerInfoDiv = document.getElementById("customerInfo");
    const arrow = document.getElementById("arrow");

    if (!customerData) {
        customerInfoDiv.textContent = "No customer data found.";
        return;
    }

    toggleDetails.addEventListener("click", function () {
        if (customerInfoDiv.style.display === "block") {
            customerInfoDiv.style.display = "none";
            arrow.classList.remove("up");
        } else {
            let infoHtml = "";

            if (customerData.photo) {
                infoHtml += `
                    <div class="customer-photo">
                        <img src="${customerData.photo}" alt="${customerData.name || 'Customer'}">
                    </div>
                `;
            }

            infoHtml += "<ul class='customer-details'>";
            for (const [key, value] of Object.entries(customerData)) {
                if (key !== "photo") {
                    infoHtml += `<li><strong>${key}:</strong> ${value}</li>`;
                }
            }
            infoHtml += "</ul>";

            customerInfoDiv.innerHTML = infoHtml;
            customerInfoDiv.style.display = "block";
            arrow.classList.add("up");
        }
    });
});
