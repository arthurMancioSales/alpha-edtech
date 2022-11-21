const result = document.querySelector("#result")

function primeNumber(x = 100000) {
    const numbers = []
    console.log(x)
    for (let i = 0; i < x; i++) {
        switch (i) {
            case 0:
            case 1:
                break
            case 2:
            case 3:
            case 5:
                numbers.push(` ${i}`)
                break
            default:
                if (i % 2 != 0 && i % 3 != 0 && i % 5 != 0) {
                    numbers.push(` ${i}`)
                }
        }
    }
    result.innerText = `Foram encontrados ${numbers.length} números primos: \n${numbers}`
    console.log(`Foram encontrados ${numbers.length} números primos: \n${numbers}`)
}