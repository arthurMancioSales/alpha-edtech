const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const usernames = new Set()
const connections = new Set()

function onConnect(ws) {
    validateUser(ws)

    ws.on("message", (message) => {
        const msg = JSON.parse(message.toString())
        
        onMessage(msg, ws)
    })

    ws.on("close", () => {
        onDisconnect(ws)
    })

    ws.on("error", console.error)
}

function onDisconnect(ws) {
    const response = {}

    response.type = "userLeft"
    response.content = `${ws.username} saiu`

    connections.delete(ws)

    connections.forEach((user) => {
        user.send(JSON.stringify(response))
    })

    usernames.delete(ws.username)
    return
    
}

function onMessage(message, ws) {
    switch (message.type) {
        case "newMessage":
            validateMessage(message.text, ws)    
            return 
        case "vote":
            return validateVote(message, ws)
    }
}

function validateUser(ws) {
    const response = {}
    
    const username = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
        length: 2
    })

    ws.username = username
    usernames.add(username)
    connections.add(ws)

    response.type = "enterSuccess"
    response.message = `${username} entrou!`
    
    connections.forEach((user) => {
        if (user.username !== username) {
            user.send(JSON.stringify(response))
        }
    })
    return
}

function validateMessage(text, ws) {
    const response = {}

    if (text.length <= 0) {
        response.type = "newMessageError"
        response.message = "Insira uma mensage válida"  
        return ws.send(JSON.stringify(response))
    }

    response.type = "newMessage"
    response.content = {
        author: ws.username,
        text: text,
    }

    connections.forEach((user) => {
        user.send(JSON.stringify(response))
    })
    return
}

module.exports = {
    onConnect
}