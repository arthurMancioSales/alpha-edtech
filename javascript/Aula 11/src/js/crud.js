// Variables and HTML elements
const addBtn = document.querySelector("#addProductBtn");
const listBtn = document.querySelector("#listProductBtn");
const confirmBtn = document.querySelector("#confirmBtn");
const cancelBtn = document.querySelector("#cancelBtn");

const tableWrapper = document.querySelector("#productList");
const tableBody = document.querySelector("#tableBody");

const result = document.querySelector("#productStatus");

const productName = document.querySelector("#productName");
const productDescription = document.querySelector("#productDescription");
const productValue = document.querySelector("#productValue");
const searchBar = document.querySelector("#productSearch");

productName.value = "";
productDescription.value = "";
productValue.value = "";
searchBar.value = "";

const nameIcon = document.querySelector("#nameIcon");
const priceIcon = document.querySelector("#priceIcon");

const productList = [];
let productId = 0;
let arrayIndex = 0;

let nameOrderFirst = false;
let priceOrderFirst = false;

tableWrapper.style.display = "none";

confirmBtn.style.display = "none";
cancelBtn.style.display = "none";

// Events
addBtn.addEventListener("click", addProduct);
listBtn.addEventListener("click", () => listProduct(productList));
confirmBtn.addEventListener("click", confirmEditProduct);
cancelBtn.addEventListener("click", cancelProduct);

function inputValidation() {
    result.innerText = ``;
    if (productName.value == "") {
        throw "Por favor, insira um nome válido";
    } else if (productDescription.value == "") {
        throw "Por favor, insira uma descrição válida";
    } else if (
        isNaN(parseFloat(productValue.value)) ||
        parseFloat(productValue.value) < 0
    ) {
        throw "Por favor, insira um valor válido";
    }
}

function addProduct() {
    try {
        inputValidation();
        productList.push(createProduct());
    } catch (error) {
        result.innerText = `Falha no cadastro do produto! ${error}`;
    }
}

function createProduct() {
    const date = new Date();
    const product = {};
    arrayIndex++;
    product.id = arrayIndex;
    product.name = productName.value;
    product.description = productDescription.value;
    product.value = parseFloat(productValue.value);
    product.includedAt = date.toISOString();
    product.updatedAt = date.toISOString();
    result.innerHTML = `Produto "${product.name}" incluído com sucesso!`;
    return product;
}

function listProduct(arr) {
    tableBody.innerHTML = "";
    arr.forEach(function (value, index) {
        let tableRow = document.createElement("tr");

        tableBody.appendChild(tableRow);

        for (let i = 0; i < 5; i++) {
            let tableData = document.createElement("td");
            switch (i) {
                case 0:
                    tableData.innerHTML = value.id;
                    break;
                case 1:
                    tableData.innerHTML = value.name;
                    tableData.addEventListener("click", showDetails);
                    tableData.style.cursor = "pointer";
                    break;
                case 2:
                    tableData.innerHTML = value.value;
                    break;
                case 3:
                    tableData.innerHTML = '<i class="fa-solid fa-pen"></i>';
                    tableData.addEventListener("click", editProduct);
                    tableData.style.cursor = "pointer";
                    break;
                case 4:
                    tableData.innerHTML = '<i class="fa-solid fa-trash"></i>';
                    tableData.addEventListener("click", deleteProduct);
                    tableData.style.cursor = "pointer";
                    break;
            }

            tableData.classList.add("text");
            tableRow.appendChild(tableData);
        }
    });

    tableWrapper.style.display = "flex";
}

function showDetails() {
    const product = this.parentNode.children[0].innerHTML;
    productList.forEach(function (value) {
        if (value.id == product) {
            result.innerText = `
                Nome: ${value.name}
                Id: ${value.id}
                Descrição: ${value.description}
                Valor: ${value.value}
                Incluido em: ${value.includedAt}
                Atualizado em: ${value.updatedAt}
                `;
        }
    });
}

function editProduct() {
    addBtn.style.display = "none";
    listBtn.style.display = "none";

    confirmBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";

    const product = this.parentNode.children[0].innerHTML;
    productList.forEach(function (value) {
        if (product == value.id) {
            productName.value = value.name;
            productDescription.value = value.description;
            productValue.value = value.value;
            productId = value.id;
        }
    });
}

function deleteProduct() {
    const obj = this.parentNode.children[0].innerHTML;

    productList.forEach(function (value, index) {
        if (value.id == obj)
            productList.splice(index, 1);
        listProduct(productList);
        return;
    });
}

function confirmEditProduct() {
    const date = new Date();

    productList.forEach(function (value) {
        if (value.id == productId) {
            value.name = productName.value;
            value.description = productDescription.value;
            value.value = parseFloat(productValue.value);
            value.updatedAt = date.toISOString();
        }
    });

    addBtn.style.display = "inline-block";
    listBtn.style.display = "inline-block";

    confirmBtn.style.display = "none";
    cancelBtn.style.display = "none";

    result.innerText = `Produto "${productName.value}" atualizado com sucesso`;
    listProduct(productList);
}

function cancelProduct() {
    addBtn.style.display = "inline-block";
    listBtn.style.display = "inline-block";

    confirmBtn.style.display = "none";
    cancelBtn.style.display = "none";

    productName.value = "";
    productDescription.value = "";
    productValue.value = "";

    result.innerText = "Operação cancelada";
}

function filterByName() {
    if (nameOrderFirst) {
        productList.reverse();
        listProduct(productList);
        result.innerText = "lista ordenada com sucesso";
        nameOrderFirst = false;
        nameIcon.className = "fa-solid fa-sort-up";
    } else {
        productList.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        listProduct(productList);
        result.innerText = "lista ordenada com sucesso";
        nameOrderFirst = true;
        nameIcon.className = "fa-solid fa-sort-down";
    }
}

function filterByPrice() {
    if (priceOrderFirst) {
        productList.reverse();
        listProduct(productList);
        result.innerText = "lista ordenada com sucesso";
        priceOrderFirst = false;
        priceIcon.className = "fa-solid fa-sort-up";
    } else {
        productList.sort(function (a, b) {
            return a.value - b.value;
        });
        listProduct(productList);
        result.innerText = "lista ordenada com sucesso";
        priceOrderFirst = true;
        priceIcon.className = "fa-solid fa-sort-down";
    }
}

let productSearchList;

function searchProducts() {
    if (searchBar.value == "") {
        result.innerText = ""
        listProduct(productList);
    } else {
        productSearchList = productList.filter(function (element) {
            return (
                element.name.includes(searchBar.value) ||
                element.description.includes(searchBar.value)
            );
        });

        if (productSearchList.length > 0) {
            result.innerText = `Foram encontrado(s) ${productSearchList.length}`;
            listProduct(productSearchList);
        } else {
            result.innerText = `Não foram encontrados produtos conforme chave de pesquisa!`;
        }
    }
}
