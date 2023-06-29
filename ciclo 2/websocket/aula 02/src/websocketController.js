const usernames = new Set()
const questions = []
const connections = new Set()
let questionCount = 0

function onConnect(ws) {
    ws.on("message", (message) => {
        const msg = JSON.parse(message.toString())
        
        onMessage(msg, ws)
    })

    ws.on("close", () => {
        onDisconnect(ws)
    })
}

function onDisconnect(ws) {
    usernames.delete(ws.username)
    connections.delete(ws)
}

function onMessage(message, ws) {
    switch (message.type) {
        case "enter":
            return ws.send(JSON.stringify(validateUser(message.username, ws)))
        case "newQuestion":
            validadeQuestion(message.text, ws)    
            return 
        case "vote":
            return validateVote(message, ws)
    }
}

function validateUser(username, ws) {
    const response = {}
    
    if (username.length <= 0) {
        response.type = "enterError"
        response.message = "Insira um nome de usuário"    
        return response
    }

    if (usernames.has(username)) {
        response.type = "enterError"
        response.message = "Nome de usuário já em uso"    
        return response
    }

    ws.username = username
    usernames.add(username)
    connections.add(ws)

    response.type = "enterSuccess"
    response.message = `Bem vindo ao chat, ${username}!`
    ws.send(JSON.stringify(response))

    response.type = "allQuestions"
    response.questions = questions
    delete response.message

    return response
}

function validadeQuestion(text, ws) {
    const response = {}

    if (text.length <= 0) {
        response.type = "newQuestionError"
        response.message = "Insira um enunciado válido"  
        return ws.send(JSON.stringify(response))
    }

    const question = {
        id: questionCount,
        author: ws.username,
        text: text,
        yes: 0,
        no: 0,
    }

    questions.push(question)

    response.type = "newQuestion"
    response.question = question
    questionCount++

    connections.forEach((user) => {
        user.send(JSON.stringify(response))
    })
    return
}

function validateVote(vote, ws) {
    const response = {}
    const question = questions.find((value) => value.id == vote.questionId)

    switch (vote.answer) {
        case "yes":
            response.update = {
                questionId: vote.questionId,
                answer: vote.answer,
                count: question.yes +1,
            }
            question.yes++
            break;
        case "no":
            response.update = {
                questionId: vote.questionId,
                answer: vote.answer,
                count: question.no +1,
            }
            question.no++
            break;
        default:
            response.type = "voteError"
            response.message = "Voto inválido"  
            return ws.send(JSON.stringify(response))
    }
    
    response.type = "voteUpdate";
    

    connections.forEach((user) => {
        user.send(JSON.stringify(response))
    })
    return
}

module.exports = {
    onConnect
}