    const listElement = document.querySelector("#todo-list tbody");

    async function fetchTodos() {
        try {
            const response = await fetch("http://localhost:3001/todos/get-all-todos");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const todos = await response.json();
            console.log("todos ~~~~>", todos);
            listElement.innerHTML = ""; // Clear existing todos
            todos.forEach(todo => {
                const row = `<tr>
                                <td>${todo?.title}</td>
                                <td>
                                    <button onclick="editTodo('${todo?._id}')">Edit</button>
                                    <button onclick="deleteTodo('${todo?._id}')">Delete</button>
                                </td>
                             </tr>`;
                listElement.innerHTML += row;
            });
        } catch (error) {
            console.error('Error:', error);
            alert("There was an error fetching the todo list.");
        }
    }

    window.deleteTodo = (id) => {
        if (!confirm("Are you sure you want to delete this todo?")) {
            return;
        }

        if(!id) {
            console.log('Id is missing');
            return;
        }

        fetch(`http://localhost:3001/todos/delete-todo/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => fetchTodos())// Refresh list after delete
            .catch(error => {
                console.error('Error:', error);
                alert("There was an error deleting the todo.");
            });
    };

    window.editTodo = (id) => {
        // You can either use localStorage or query parameters. Here's using query params for example:
        localStorage.setItem('editingTodoId', id);
        window.location.href = `edit.html?id=${id}`;
    };

    fetchTodos();
