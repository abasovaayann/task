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
            // ---- Remove old stuff before re-adding ----
            const existingPhoto = customerInfoDiv.querySelector(".photo-container");
            if (existingPhoto) existingPhoto.remove();

            const existingCopies = customerInfoDiv.querySelectorAll(".copy-btn");
            existingCopies.forEach(btn => btn.remove());

            // ---- Fill <p> elements ----
            const paragraphs = customerInfoDiv.getElementsByTagName("p");
            paragraphs[0].innerHTML = `CIF: ${customerData.cif || ""}`;
            paragraphs[1].textContent = `Name: ${customerData.firstName || ""}`;
            paragraphs[2].textContent = `Surname: ${customerData.lastName || ""}`;
            paragraphs[3].innerHTML = `Account Number: ${customerData.accountNumber || ""}`;
            paragraphs[4].textContent = `Address: ${customerData.address || ""}`;
            paragraphs[5].textContent = `Birthday: ${customerData.birthDate || ""}`;

            // ---- Highlight birthday if today ----
            if (customerData.birthDate) {
                const today = new Date().toISOString().slice(5, 10);
                const birthDate = new Date(customerData.birthDate).toISOString().slice(5, 10);
                if (today === birthDate) {
                    paragraphs[5].style.background = "#fffae6";
                    paragraphs[5].textContent += " 🎉 Happy Birthday!";
                }
            }

            // ---- Add Copy buttons (only once) ----
            function createCopyButton(textToCopy) {
                const btn = document.createElement("button");
                btn.textContent = "Copy";
                btn.className = "copy-btn";
                btn.onclick = () => {
                    navigator.clipboard.writeText(textToCopy);
                    alert("Copied to clipboard!");
                };
                return btn;
            }
            paragraphs[0].appendChild(createCopyButton(customerData.cif));
            paragraphs[3].appendChild(createCopyButton(customerData.accountNumber));

            // ---- Add photo with edit button overlay ----
            if (customerData.photo) {
                const photoContainer = document.createElement("div");
                photoContainer.className = "photo-container";

                const img = document.createElement("img");
                img.src = customerData.photo;
                img.alt = customerData.firstName || "Customer";
                img.className = "customer-photo";

                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.className = "edit-overlay-btn";
                editBtn.onclick = () => {
                    localStorage.setItem("editCustomer", JSON.stringify(customerData));
                    window.location.href = "edit.html";
                };

                photoContainer.appendChild(img);
                photoContainer.appendChild(editBtn);

                // Insert at the top
                customerInfoDiv.insertBefore(photoContainer, customerInfoDiv.firstChild);
            }
        }
    });
});
