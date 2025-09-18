const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");


// 🔽 Dropdown fill
for (let select of dropdowns) {
    for (let code in countryList) {
        let option = document.createElement("option");
        option.value = code;
        option.innerText = code;

        if (select.name === "from" && code === "USD") {
            option.selected = true;
        } else if (select.name === "to" && code === "PKR") {
            option.selected = true;
        }

        select.append(option);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

    
    const URL = `https://open.er-api.com/v6/latest/${from.value}`;

    let response = await fetch(URL);
    let data = await response.json();
    console.log(data); 

    if (data.result === "success") {
        let rate = data.rates[to.value]; 
        let converted = (amountVal * rate).toFixed(2);

        document.querySelector(".msg").innerText =
            `${amountVal} ${from.value} = ${converted} ${to.value}`;
    } else {
        document.querySelector(".msg").innerText =
            "⚠️ API Error! Please try again.";
    }
});
