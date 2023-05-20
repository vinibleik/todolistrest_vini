import taskService from "./taskservice.js"

let atualizaTarefas = async function() {
    let resp = await taskService.lista()
    if (resp.status) {
        let ul =  document.querySelector("#tarefas");
        ul.innerHTML = "";
        resp.list.forEach((item) => {
            let li = document.createElement("li")
                        
            let edit = document.createElement("button")
            edit.addEventListener("click", function() {
                document.querySelector("#tid").value = item.id
                document.querySelector("#tnome").value = item.name
            })
            edit.className = "btn btn-link"
            edit.innerHTML = "edit"
                        
            let del = document.createElement("button")
            del.innerHTML = "done"
            del.className = "btn btn-link"
            del.addEventListener("click", async function() {
                if (confirm("Deseja finalizar a tarefa?")) {
                    let resp = await taskService.exclui(item.id)
                    if (resp.status) {
                        ul.removeChild(li);
                    }
                }
            })

            li.appendChild(document.createTextNode(item.name + " "))
            li.appendChild(edit)
            li.appendChild(del)
            ul.appendChild(li)
        })
    }
}

window.addEventListener("load", function() {
    atualizaTarefas()

    document.querySelector("form").addEventListener("submit", async function(evt) {
        evt.preventDefault();
        let hid = document.querySelector("#tid")
        let hnome = document.querySelector("#tnome")
        let resp;
        if (hid.value) {
            resp = await taskService.altera(hid.value, hnome.value);
        } else {
            resp = await taskService.novo(hnome.value);
        }
        if (resp.status) {
            atualizaTarefas()
            hid.value = '';
            hnome.value = '';
        }
    })
})