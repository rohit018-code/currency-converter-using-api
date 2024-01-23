const BASE_URL  = 
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for(currCodes in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCodes;
        newOption.value = currCodes;
        if(select.name == "from" && currCodes == "USD"){
            newOption.selected = "selected";
        }
        else if(select.name == "to" && currCodes == "INR"){
                newOption.selected = "selected";
            }
        
        select.append(newOption);
    }


 select.addEventListener("change",(evt) => {
    updateflag(evt.target);
 });
}

const updateflag = (element) =>{
    let currCodes = element.value;
    let countryCode = countryList[currCodes];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amval = amount.value;
    if(amval === "" || amval <1){
        amval =1;
        amount.value ="1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalamount = amval*rate;
    msg.innerText = `${amval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`
})

