const ws = new WebSocket("ws://localhost:8000");

const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input")
const messageButton = document.getElementById("send-button")

ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data)

    switch (message.type) {
        case "enterSuccess":
            handleEnterSucess(message.message)
            break;
        case "newMessageError":
            handleNewMessageError(message)
            break;
        case "newMessage":
            handleNewMessage(message.content)
            break;
        case "userLeft":
            handleUserLeft(message.content)
            break;
    }
})

messageButton.addEventListener("click", newMessage)

function newMessage() {
    const message = {
        type: "newMessage",
        text: messageInput.value
    }

    ws.send(JSON.stringify(message))

    messageInput.value = ""
}

function handleEnterSucess(message) {
    messageContainer.innerText += `${message} \n`
}

function handleNewMessageError(message) {
    alert(message.message)
}

function handleNewMessage(content) {
    messageContainer.innerText += `${content.author}: ${content.text}\n`
}

function handleUserLeft(text) {
    messageContainer.innerText += `${text}\n`
}