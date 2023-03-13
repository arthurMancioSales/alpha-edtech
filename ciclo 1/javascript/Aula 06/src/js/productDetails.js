// defines the base style to the product div
const resultDivDispay = document.querySelector("#productResultDiv");
resultDivDispay.style.display = "none";

// Selects essential elements of the DOM
const resultProduct = document.querySelector("#resultProduct");
const resultImg = document.querySelector("#productImg");

// Creates an event so whenever the select element is changed, switch between different products
document.querySelector("#productForm")["productInput"].addEventListener("change", function(event) {

    // Main logic
    // Checks the input, and changes the content acording to the option
    switch (event.target.value) {
        case "HB20 1.6":
            resultImg.src = "https://images.noticiasautomotivas.com.br/img/f/novo-hb20-sport-1.jpg";
            resultProduct.innerText = "HB20 1.6 \n Hyundai \n 130 cavalos \n  0-100km/h: 9,3s"
            break;
        case "Gol 1.6":
            resultImg.src = "https://images.noticiasautomotivas.com.br/img/f/volkswagen-gol-2021-3.jpeg";
            resultProduct.innerText = "Gol 1.6 \n Volkswagen \n 120 cavalos \n  0-100km/h: 9,5s"
            break;
        case "Polo TSI":
            resultImg.src = "https://images.noticiasautomotivas.com.br/img/f/volkswagen-polo-2018-NA-52.jpg";
            resultProduct.innerText = "Polo TSI \n Volkswagen \n 128 cavalos \n  0-100km/h: 9,6s"
            break;
        case "Onix RS 1.0":
            resultImg.src = "https://images.noticiasautomotivas.com.br/img/f/onix-rs-onix-plus-midnight-16.jpg";
            resultProduct.innerText = "Onix RS 1.0 \n Chevrolet \n 116 cavalos \n  0-100km/h: 10,1s"
            break;  
        case "Palio Sporting 1.6":
            resultImg.src = "https://images.noticiasautomotivas.com.br/img/f/palio_sporting_2016-1.jpg";
            resultProduct.innerText = "Palio Sporting 1.6 \n Fiat \n 117 cavalos \n  0-100km/h: 9,8s"
        }

    // defines the img style
    resultImg.style.width = "100%";
    resultDivDispay.style.display = "flex";
    resultDivDispay.style.flexDirection = "column";
    
    // Clear previous answers
    productForm["productInput"].value = null;
});