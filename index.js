
const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')
const cors = require('cors')


const port = 3001
const app = express()
app.use(express.json())
app.use(cors()) // sem cors: ele vai bloquearo acesso no meu back-end



const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)   // procurando o usuario dentro da mihha array, me retornando a posição do meu usuario

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })

    }
    request.userIndex = index
    request.userId = id  

    next() // essa é uma estrutura "Middleware"
}








app.get('/users', (request, response) => {


    return response.json(users)  
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body    // trazendo as inforçoes atualziadas

    const index = request.userIndex 
    const id = request.userId

    const updateUser = { id, name, age }  // usuario sendo atualizado


    users[index] = updateUser  // atualizando, e mostrando na tela o meu úsuario sendo atualizado




    return response.json(updateUser)
})



app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex 



    users.splice(index, 1)

    return response.status(204).json()

})








app.listen(3001, () => {
    console.log('🚀Serven started on port 3001🚀')
})  // porta de rota no meu caso eu to ultizando a porta de rota 3001 
//por que a porta 3000 ta sendo ultilizada