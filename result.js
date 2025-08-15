document.addEventListener("DOMContentLoaded", function () {
    const customerData = JSON.parse(localStorage.getItem("selectedCustomer"));
    const toggleDetails = document.getElementById("toggleDetails");
    const customerInfoDiv = document.getElementById("customerInfo");
    const arrow = document.getElementById("arrow");

    if (!customerData) {
        customerInfoDiv.innerHTML = "<p>No customer data found.</p>";
        return;
    }

    toggleDetails.addEventListener("click", function () {
        customerInfoDiv.classList.toggle("open");
        arrow.classList.toggle("up");

        if (customerInfoDiv.classList.contains("open")) {
            // Remove old image
            const existingImg = customerInfoDiv.querySelector(".customer-photo");
            if (existingImg) existingImg.remove();

            // Fill <p> elements
            const paragraphs = customerInfoDiv.getElementsByTagName("p");
            paragraphs[0].innerHTML = `CIF: ${customerData.cif || ""}`;
            paragraphs[1].textContent = `Name: ${customerData.firstName || ""}`;
            paragraphs[2].textContent = `Surname: ${customerData.lastName || ""}`;
            paragraphs[3].innerHTML = `Account Number: ${customerData.accountNumber || ""}`;
            paragraphs[4].textContent = `Address: ${customerData.address || ""}`;
            paragraphs[5].textContent = `Birthday: ${customerData.birthDate || ""}`;

            // Highlight birthday if today
            if (customerData.birthDate) {
                const today = new Date().toISOString().slice(5, 10);
                const birthDate = new Date(customerData.birthDate).toISOString().slice(5, 10);
                if (today === birthDate) {
                    paragraphs[5].style.background = "#fffae6";
                    paragraphs[5].textContent += " 🎉 Happy Birthday!";
                }
            }

            // Add Copy buttons
            function createCopyButton(textToCopy) {
                const btn = document.createElement("button");
                btn.textContent = "📋 Copy";
                btn.className = "copy-btn";
                btn.onclick = () => {
                    navigator.clipboard.writeText(textToCopy);
                    alert("Copied to clipboard!");
                };
                return btn;
            }
            paragraphs[0].appendChild(createCopyButton(customerData.cif));
            paragraphs[3].appendChild(createCopyButton(customerData.accountNumber));

            // Add photo if available
            if (customerData.photo) {
                const img = document.createElement("img");
                img.src = customerData.photo;
                img.alt = customerData.firstName || "Customer";
                img.className = "customer-photo";
                customerInfoDiv.insertBefore(img, customerInfoDiv.firstChild);
            }
        }
    });
});
