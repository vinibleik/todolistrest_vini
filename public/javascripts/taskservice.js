let taskService = {
    lista: async function() {
        const response = await fetch('/api/tasks')
        return await response.json()
    },
    busca: async function(id) {
        const response = await fetch('/api/tasks/' + id)
        return await response.json()
    },
    novo: async function(nome) {
        const data = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nome: nome})
        }
        const response = await fetch('/api/tasks', data)
        return await response.json()
    },
    altera: async function(id, nome) {
        const data = {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nome: nome})
        }
        const response = await fetch('/api/tasks/'+id, data)
        return await response.json()
    },
    exclui: async function(id) {
        const response = await fetch('/api/tasks/'+id, {method: 'DELETE'})
        return await response.json()
    }
}

export default taskService