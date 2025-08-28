document.addEventListener("DOMContentLoaded", function () {
  const customerData = JSON.parse(localStorage.getItem("selectedCustomer"));

  // DOM elements
  const customerInfoDiv = document.getElementById("customerInfo");
  const rightPanel = document.getElementById("rightPanel");
  const closePanelBtn = document.getElementById("closePanel");
  const toggleTransactionsBtn = document.getElementById("toggleTransactions");
  const transactionHistoryDiv = document.getElementById("transactionHistory");

  // State
  let selectedCardIndex = null;

  // If no data
  if (!customerData) {
    customerInfoDiv.innerHTML = "<p>No customer data found.</p>";
    return;
  }

  // Utility
  function createCopyButton(textToCopy) {
    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.className = "copy-btn";
    btn.onclick = () => {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }).catch(() => alert("Failed to copy to clipboard"));
    };
    return btn;
  }

  function clearExistingElements(container, selector) {
    const existing = container.querySelectorAll(selector);
    existing.forEach(el => el.remove());
  }

  // Fill customer info + photo + mini cards
  function updateCustomerInfo() {
    clearExistingElements(customerInfoDiv, ".photo-container, .copy-btn, .mini-cards-container");

    const paragraphs = customerInfoDiv.getElementsByTagName("p");
    if (paragraphs.length >= 6) {
      paragraphs[0].innerHTML = `CIF: ${customerData.cif || ""}`;
      paragraphs[1].textContent = `Name: ${customerData.firstName || ""}`;
      paragraphs[2].textContent = `Surname: ${customerData.lastName || ""}`;
      paragraphs[3].innerHTML = `Account Number: ${customerData.accountNumber || ""}`;
      paragraphs[4].textContent = `Address: ${customerData.address || ""}`;
      paragraphs[5].textContent = `Birthday: ${customerData.birthDate || ""}`;
      paragraphs[6].textContent = `Email: ${customerData.email || ""}`;

      if (!customerData.email) {
        paragraphs[6].innerHTML += ` <span class="no-data"><b>No email provided</b></span>`;
      }

      if (customerData.cif) paragraphs[0].appendChild(createCopyButton(customerData.cif));
      if (customerData.accountNumber) paragraphs[3].appendChild(createCopyButton(customerData.accountNumber));
    }

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
      customerInfoDiv.insertBefore(photoContainer, customerInfoDiv.firstChild);
    }

    createMiniCardsContainer();
  }

  function createMiniCardsContainer() {
    if (!customerData.bankCards || customerData.bankCards.length === 0) return;

    const miniCardsContainer = document.createElement("div");
    miniCardsContainer.className = "mini-cards-container";
    miniCardsContainer.style.cssText = `
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    `;

    const title = document.createElement("h3");
    title.textContent = "Bank Cards:";
    title.style.cssText = `
      margin: 0 0 15px 0;
      font-size: 16px;
      color: #333;
      font-weight: bold;
    `;
    miniCardsContainer.appendChild(title);

    const cardsWrapper = document.createElement("div");
    cardsWrapper.className = "cards-list";

    customerData.bankCards.forEach((card, index) => {
      const miniCard = document.createElement("div");
      miniCard.className = "mini-card";
      miniCard.dataset.cardIndex = index;

      const cardNumber = card.cardNumber || "";
      const firstFour = cardNumber.slice(0, 4);
      const lastFour = cardNumber.length >= 4 ? cardNumber.slice(-4) : cardNumber;

      miniCard.innerHTML = `
        <div class="brand">${card.cardType || "Unknown"}</div>
        <div class="masked-number">${firstFour} •••• •••• ${lastFour}</div>
        <div class="holder">${customerData.firstName || ""} ${customerData.lastName || ""}</div>
      `;

      miniCard.addEventListener("click", () => selectCard(index));
      cardsWrapper.appendChild(miniCard);
    });

    miniCardsContainer.appendChild(cardsWrapper);
    customerInfoDiv.appendChild(miniCardsContainer);
  }

  function selectCard(index) {
    selectedCardIndex = index;

    const miniCards = document.querySelectorAll(".mini-card");
    miniCards.forEach((card, i) => {
      if (i === index) {
        card.style.border = "3px solid #007BFF";
        card.style.transform = "scale(1.02)";
      } else {
        card.style.border = "none";
        card.style.transform = "scale(1)";
      }
    });

    displaySelectedCard(index);
  }

  function displaySelectedCard(index) {
    const card = customerData.bankCards[index];
    if (!card) return;

    const cardDetailsDiv = rightPanel.querySelector(".card-details");
    const cardDetailsPs = cardDetailsDiv.querySelectorAll("p");

    cardDetailsPs[0].textContent = `Card Number: ${card.cardNumber || ""}`;
    cardDetailsPs[1].textContent = `Expiry Date: ${card.expiryDate || ""}`;
    cardDetailsPs[2].textContent = `CVV: ${card.cvv || ""}`;
    cardDetailsPs[3].textContent = `Card Type: ${card.cardType || ""}`;
    cardDetailsPs[4].textContent = `Balance: ${card.cardBalance || ""}`;

    rightPanel.classList.add("open");
  }
//Toggle transaction history
toggleTransactionsBtn.addEventListener("click",()=>{
  if(transactionHistoryDiv.style.display==="none"){
    transactionHistoryDiv.style.display="block";
    toggleTransactionsBtn.textContent="Hide Transactions";
  }else{
    transactionHistoryDiv.style.display="none";
    toggleTransactionsBtn.textContent="Show Transactions";
  }
})

  // Always load customer info immediately
  updateCustomerInfo();

  // Events
  closePanelBtn.addEventListener("click", () => rightPanel.classList.remove("open"));
});
