document.addEventListener("DOMContentLoaded", function() {
const customerData = JSON.parse(localStorage.getItem("selectedCustomer"));
const customerInfoDiv=document.getElementById("customerInfo");

if(customerData){
    let infoHtml="<ul>";
    for(const[key,value] of Object.entries(customerData)){
        infoHtml+=`<li><strong>${key}:</strong> ${value}</li>`;
    }
    infoHtml+="</ul>";
    customerInfoDiv.innerHTML=infoHtml;
}else{
    customerInfoDiv.innerHTML="<p>No customer information available.</p>";
}
});
