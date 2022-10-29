document.querySelector("#cepInput").addEventListener("keydown", function (event) {
    console.log(event.target.value.length)
   
    const cepInput = event.target;
    const pattern = /[0-9]/gi;

    if (pattern.test(event.key)) {
        if (cepInput.value.length <= 8) {
            event.preventDefault();
            if (cepInput.value.length < 6) {
                if (cepInput.value.length == 0) {
                    cepInput.value += `${event.key}-`;
                } else if (cepInput.value.length >= 1) {
                    cepInput.value = cepInput.value.replaceAll("-", "")
                    cepInput.value = cepInput.value.concat(event.key)
                    cepInput.value += "-";
                }
            } else {
                cepInput.value += event.key;
            }
        } else {
            event.preventDefault();
        }
    } else if (event.key == "Backspace") {
        return;
    } else {
        event.preventDefault();
    }
});