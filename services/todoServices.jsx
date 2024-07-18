export const getAllTodos = async (contextHandler) => {
  const response = await fetch("http://localhost:3000/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + "token",
    },
  });

  const data = await response.json();
  console.log(data);

  // updating the data in the context
  contextHandler(data.data.todos);
};

export const deleteTodo = (contextHandler) => {};

export const updateTodo = async (id, contextHandler) => {
  const response = await fetch("http://localhost:3000/todos/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + "token",
    },
  });

  const data = await response.json();
  console.log(data);
};

export const createTodo = async (todo, contextHandler) => {
  console.log(todo);
  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + "authCtx.token",
    },
    body: JSON.stringify(todo),
  });

  const data = await response.json();

  if (response.ok) {
    // updating the data in the context
    contextHandler(data.data.newTodo);
  }
};
