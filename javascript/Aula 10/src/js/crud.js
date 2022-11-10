// Variables and HTML elements
const addBtn = document.querySelector("#addProductBtn")
const listBtn = document.querySelector("#listProductBtn")
const confirmBtn = document.querySelector("#confirmBtn")
const cancelBtn = document.querySelector("#cancelBtn")

const tableWrapper = document.querySelector("#productList")
const tableBody = document.querySelector("#tableBody")

const result = document.querySelector("#productStatus")

const productName = document.querySelector("#productName")
const productDescription = document.querySelector("#productDescription")
const productValue = document.querySelector("#productValue")

const productList = []
let productId = 0

tableWrapper.style.display = "none"

confirmBtn.style.display = "none"
cancelBtn.style.display = "none"

// Events
addBtn.addEventListener("click", addProduct)
listBtn.addEventListener("click", listProduct)
confirmBtn.addEventListener("click", confirmEditProduct)
cancelBtn.addEventListener("click", cancelProduct)

function inputValidation() {
    result.innerHTML = ``
    if (productName.value == "") {
        throw "Por favor, insira um nome válido"
    } else if (productDescription.value == "") {
        throw "Por favor, insira uma descrição válida"
    } else if (isNaN(parseFloat(productValue.value)) || parseFloat(productValue.value) < 0) {
        throw "Por favor, insira um valor válido"
    }

}

function addProduct() {
    try {
        inputValidation()
        productList.push(createProduct())
    } catch (error) {
        result.innerHTML = `Falha no cadastro do produto! ${error}`
    }
}

function createProduct() {

    const date = new Date()
    const product = {}

    product.id = productList.length + 1
    product.name = productName.value
    product.description = productDescription.value
    product.value = parseFloat(productValue.value)
    product.includedAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    product.updatedAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    result.innerHTML = `Produto "${product.name}" incluído com sucesso!`
    return product
}

function listProduct() {
    try {
        if (productList.length == 0) throw "Erro: nenhum produto foi cadastrado ainda"
        tableBody.innerHTML = ""

        let i = 0
        while (i < productList.length) {
            if (productList[i] == "") {
                i++
                continue
            }
            let tableRow = document.createElement("tr")
            tableBody.appendChild(tableRow)

            let a = 0
            while (a < 5) {
                let tableData = document.createElement("td")
                switch (a) {
                    case 0:
                        tableData.innerHTML = productList[i].id
                        break
                    case 1:
                        tableData.innerHTML = productList[i].name
                        tableData.addEventListener("click", showDetails)
                        tableData.style.cursor = "pointer"
                        break
                    case 2:
                        tableData.innerHTML = productList[i].value
                        break
                    case 3:
                        tableData.innerHTML = '<i class="fa-solid fa-pen"></i>'
                        tableData.addEventListener("click", editProduct)
                        tableData.style.cursor = "pointer"
                        break
                    case 4:
                        tableData.innerHTML = '<i class="fa-solid fa-trash"></i>'
                        tableData.addEventListener("click", deleteProduct)
                        tableData.style.cursor = "pointer"
                        break
                }
                tableData.classList.add("text")
                tableRow.appendChild(tableData)
                a++
            }
            i++
        }
        tableWrapper.style.display = "flex"
    } catch (error) {
        result.innerHTML = error
    }
}

function showDetails() {
    let i = 0
    while (i < productList.length) {
        if (productList[i].name == this.innerHTML) {
            result.innerText = 
                `
                Nome: ${productList[i].name} \n
                Id: ${productList[i].id} \n
                Descrição: ${productList[i].description} \n
                Valor: ${productList[i].value} \n
                Incluido em: ${productList[i].includedAt}
                Atualizado em: ${productList[i].updatedAt}
                `
        }
        i++
    }
}

function editProduct() {
    addBtn.style.display = "none"
    listBtn.style.display = "none"
    
    confirmBtn.style.display = "inline-block"
    cancelBtn.style.display = "inline-block"

    let i = 0
    while (i < productList.length) {
        if (this.parentNode.children[0].innerHTML == productList[i].id) {
            productName.value = productList[i].name
            productDescription.value = productList[i].description
            productValue.value = productList[i].value
            productId = productList[i].id
        }
        
        i++
    }
}

function deleteProduct() {
    let i = 0
    while (i < productList.length) {
        if (productList[i].name == this.parentNode.children[1].innerHTML) {
            productList[i] = ""
        }
        i++
    }
    listProduct()
}

function confirmEditProduct() {
    
    const date = new Date()

    let i = 0
    while (i < productList.length) {
        if (productList[i].id == productId) {
            console.log(productName.value)
            productList[i].name = productName.value
            productList[i].description = productDescription.value
            productList[i].value = parseFloat(productValue.value)
            productList[i].updatedAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
        i++
    }

    addBtn.style.display = "inline-block"
    listBtn.style.display = "inline-block"
    
    confirmBtn.style.display = "none"
    cancelBtn.style.display = "none"

    result.innerHTML = `Produto "${productName.value}" atualizado com sucesso`
    listProduct()
}

function cancelProduct() {
    addBtn.style.display = "inline-block"
    listBtn.style.display = "inline-block"
    
    confirmBtn.style.display = "none"
    cancelBtn.style.display = "none"

    productName.value = ""
    productDescription.value = ""
    productValue.value = ""

    result.innerHTML = "Operação cancelada"
}