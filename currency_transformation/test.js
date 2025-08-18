const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');

    const API_KEY = "b2e39021aef2aae0359c0635"; 
    const BASE = "USD"; 

    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE}`)
      .then(res => res.json())
      .then(data => {
        if (data.result !== "success") {
          resultDiv.textContent = "Error loading currencies.";
          return;
        }

        const currencies = Object.keys(data.conversion_rates);

        currencies.forEach(code => {
          let option1 = document.createElement("option");
          option1.value = code;
          option1.textContent = code;

          let option2 = option1.cloneNode(true);

          fromCurrency.appendChild(option1);
          toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
      })
      .catch(err => {
        resultDiv.textContent = "Failed to load currencies.";
        console.error(err);
      });

    convertBtn.addEventListener('click', () => {
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount.';
        return;
      }

      const from = fromCurrency.value;
      const to = toCurrency.value;

      fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`)
        .then(res => res.json())
        .then(data => {
          if (data.result !== "success") {
            resultDiv.textContent = 'Error fetching exchange rates.';
            return;
          }

          const rate = data.conversion_rates[to];
          if (!rate) {
            resultDiv.textContent = 'Currency not available.';
            return;
          }

          const converted = amount * rate;
          resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
        })
        .catch(err => {
          resultDiv.textContent = 'Error fetching exchange rates.';
          console.error(err);
        });
    });