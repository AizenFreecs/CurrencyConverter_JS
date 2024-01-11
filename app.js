let inputAmount = document.querySelector(".amountInput input");
let dropdown = document.querySelectorAll('.dropdown select')
let btn = document.querySelector("#cnvBtn");
let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let fromCurr = document.querySelector(".from select");
let toCurr =  document.querySelector(".to select");
let msg = document.querySelector('#outputText');


for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode==='USD'){
            newOption.selected = 'selected';
        }else if(select.name === 'to' && currCode==='INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    })
}

const updateExchangeRate = async ()=>{
    let fromCountry = fromCurr.value.toLowerCase();
    let toCountry = toCurr.value.toLowerCase();
    let newUrl = `${BASE_URL}/${fromCountry}/${toCountry}.json`;
    
    let response = await fetch(newUrl);
    let data = await response.json();
    
    let amount = inputAmount.value;
    if(amount==="" || amount<1){
        amount.value = 1;
        inputAmount.value = 1;
    };
    let finalAmount = amount * data[toCountry];
    console.log(finalAmount);
    
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

}
const updateFlag = (element)=>{
    let country = element.value;
    let code = countryList[country];
    let newSource = `https://flagsapi.com/${code}/shiny/64.png`
    let img = element.parentElement.querySelector('img');
    img.src=newSource;
}
btn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener('load',()=>{
    updateExchangeRate();
})