const resultField = document.querySelector("#objectResult")

function createObject() {
    const object = {}
    object["Um atributo com espaços"] = 1

    console.log(`${Object.keys(object)[0]}: ${object["Um atributo com espaços"]}`)
    
    console.log(Object.entries(object))

    for (const [key, value] of Object.entries(object)) {
        console.log(`${key}: ${value}`)
    }
}