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

            // Clear old image if exists
            const existingImg = customerInfoDiv.querySelector(".customer-photo");
            if (existingImg) existingImg.remove();

            // Fill <p> elements with values
            const paragraphs = customerInfoDiv.getElementsByTagName("p");
            paragraphs[0].textContent = `CIF: ${customerData.cif || ""}`;
            paragraphs[1].textContent = `Name: ${customerData.firstName || ""}`;
            paragraphs[2].textContent = `Surname: ${customerData.lastName || ""}`;
            paragraphs[3].textContent = `Account Number: ${customerData.accountNumber || ""}`;
            paragraphs[4].textContent = `Address: ${customerData.address || ""}`;
            paragraphs[5].textContent = `Birthday: ${customerData.birthDate || ""}`;
            paragraphs[6].textContent = `Phone: ${customerData.phone || ""}`;

            // Add photo at the top if available
            if (customerData.photo) {
                const img = document.createElement("img");
                img.src = customerData.photo;
                img.alt = customerData.name || "Customer";
                img.className = "customer-photo"; // Use your CSS
                customerInfoDiv.insertBefore(img, customerInfoDiv.firstChild);
            }
        }
    });
});
