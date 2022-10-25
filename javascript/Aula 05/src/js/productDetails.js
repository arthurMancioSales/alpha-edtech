const resultDivOpacity = document.querySelector("#productResultDiv");
resultDivOpacity.style.display = "none";

// Creates an event so when the submit button is pressed, calculates the user BMI
productForm.addEventListener("submit", function (event) {
    // Prevents the page to refresh after submiting
    event.preventDefault();

    // Selects essential elements of the DOM
    const productForm = document.querySelector("#productForm");
    const resultProduct = document.querySelector("#resultProduct");
    const resultImg = document.querySelector("#productImg");
    // Select the max number and min number values from the HTML document and assigns them to a variable
    const productInput = productForm["productInput"].value;

    // Main logic
    // Checks if the inputs are a number, and if so, chooses a random number between the two numbers
    switch (productInput) {
        case "kiwi":
            resultImg.src = "https://freepngimg.com/thumb/kiwi/24-green-cutted-kiwi-png-image.png";
            console.log(resultImg)
            resultImg.style.width = "100%";
            resultProduct.innerText = "Kiwi"
            resultDivOpacity.style.display = "flex";
            resultDivOpacity.style.flexDirection = "column";
            break;
        case "pineapple":
            resultImg.src = "http://2.bp.blogspot.com/-gOwallZpIS0/VZmpdS2oI4I/AAAAAAAAAAs/6vxPaH5ZX70/s1600/pineapple%2B05.png";
            resultImg.style.width = "100%";
            resultProduct.innerText = "Abacaxi"
            resultDivOpacity.style.display = "flex";
            resultDivOpacity.style.flexDirection = "column";
            break;
        case "grape":
            resultImg.src = "https://pluspng.com/img-png/uvas-png-si-quieres-limpiar-tu-organismo-asi-como-ayudar-a-tu-cuerpo-a-prepararse-para-el-invierno-unete-al-equipo-de-bq-y-empieza-la-cura-de-la-uva-849.png";
            resultImg.style.width = "100%";
            resultProduct.innerText = "Uva"
            resultDivOpacity.style.display = "flex";
            resultDivOpacity.style.flexDirection = "column";
            break;
        case "peach":
            resultImg.src = "https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2018/09/Imagem-de-Frutas-P%C3%AAssego-10-PNG-1024x850.png";
            resultImg.style.width = "100%";
            resultProduct.innerText = "Pêssego"
            resultDivOpacity.style.display = "flex";
            resultDivOpacity.style.flexDirection = "column";
            break;
        case "strawberry":
            resultImg.src = "https://www.pngplay.com/wp-content/uploads/1/Sliced-Strawberry-Transparent-File.png";
            resultImg.style.width = "100%";
            resultProduct.innerText = "morango"
            resultDivOpacity.style.display = "flex";
            resultDivOpacity.style.flexDirection = "column";
    }

    // // Clear previous answers
    productForm["productInput"].value = null;
});

// Debug function
// Creates an infinite loop until the min number and max number are choosed randomly
function batata(n1, n2, b) {
    const productForm = document.querySelector("#productForm");
    const productInput = productForm["productInput"];

    console.log(productInput.value);
    console.log(typeof productInput.value);
}
