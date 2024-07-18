export const getAllTodos = async (contextHandler, setErrorMessage) => {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("key"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch todos.");
    }

    const data = await response.json();
    console.log(data);

    contextHandler(data.data.todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    setErrorMessage("An error occurred while fetching todos.");
  }
};

export const deleteTodo = async (id, contextHandler, setErrorMessage) => {
  try {
    const response = await fetch("http://localhost:3000/todos/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("key"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo.");
    }

    const data = await response.json();
    console.log(data);

    contextHandler((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  } catch (error) {
    console.error("Error deleting todo:", error);
    setErrorMessage("An error occurred while deleting the todo.");
  }
};

export const updateTodo = async (id, updatedTodo, contextHandler, setErrorMessage) => {
  try {
    const response = await fetch("http://localhost:3000/todos/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("key"),
      },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo.");
    }

    const data = await response.json();
    console.log(data);

    contextHandler((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? data.data.updatedTodo : todo))
    );
  } catch (error) {
    console.error("Error updating todo:", error);
    setErrorMessage("An error occurred while updating the todo.");
  }
};

export const createTodo = async (todo, contextHandler, setErrorMessage) => {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("key"),
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Failed to create todo.");
    }

    const data = await response.json();
    console.log(data);

    contextHandler((prevTodos) => [...prevTodos, data.data.newTodo]);
  } catch (error) {
    console.error("Error creating todo:", error);
    setErrorMessage("An error occurred while creating the todo.");
  }
};

export const getTodoById = async (id, setTodo, setErrorMessage) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("key"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch todo.");
    }

    const data = await response.json();
    console.log(data);

    setTodo(data.data.todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    setErrorMessage("An error occurred while fetching the todo.");
  }
};

export const completeTodo = async (id, contextHandler, setErrorMessage) => {
  try {
    const response = await fetch(`http://localhost:3000/todos/complete/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("key"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to complete todo.");
    }

    const data = await response.json();
    console.log(data);

    contextHandler((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? data.data.completedTodo : todo))
    );
  } catch (error) {
    console.error("Error completing todo:", error);
    setErrorMessage("An error occurred while completing the todo.");
  }
};

(async () => {
  const contextHandler = (data) => console.log("Context updated:", data);
  const setErrorMessage = (message) => console.error("Error:", message);
  
  await getAllTodos(contextHandler, setErrorMessage);

  const newTodo = { title: "New Todo", description: "Description of the new todo" };
  await createTodo(newTodo, contextHandler, setErrorMessage);

  const updatedTodo = { title: "Updated Todo", description: "Updated description" };
  await updateTodo(1, updatedTodo, contextHandler, setErrorMessage);

  await completeTodo(1, contextHandler, setErrorMessage);

  await deleteTodo(1, contextHandler, setErrorMessage);

  await getTodoById(1, (todo) => console.log("Single todo:", todo), setErrorMessage);
})();
