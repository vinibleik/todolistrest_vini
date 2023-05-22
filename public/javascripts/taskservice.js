let taskService = {
  lista: async function () {
    try {
      const response = await fetch("/api/tasks");
      return await response.json();
    } catch (error) {
      return { status: false, msg: "Erro de requisição" };
    }
  },
  busca: async function (id) {
    try {
      const response = await fetch("/api/tasks/" + id);
      return await response.json();
    } catch (error) {
      return { status: false, msg: "Erro de requisição" };
    }
  },
  novo: async function (nome, priority) {
    const data = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ nome, priority }),
    };
    try {
      const response = await fetch("/api/tasks", data);
      return await response.json();
    } catch (error) {
      return { status: false, msg: "Erro de requisição" };
    }
  },
  altera: async function (id, nome, priority) {
    const data = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ nome, priority }),
    };
    try {
      const response = await fetch("/api/tasks/" + id, data);
      return await response.json();
    } catch (error) {
      return { status: false, msg: "Erro de requisição" };
    }
  },
  exclui: async function (id) {
    try {
      const response = await fetch("/api/tasks/" + id, { method: "DELETE" });
      return await response.json();
    } catch (error) {
      return { status: false, msg: "Erro de requisição" };
    }
  },
};

export default taskService;
