document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list");

    // Fetch todos from the API
    fetch("http://localhost:3000/todos/get-all-todos")
        .then((response) => response.json())
        .then((data) => {
            // Iterate over the todos and create list items
            data.forEach((todo) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <h2>${todo.title}</h2>
                    <p><strong>Author:</strong> ${todo.author}</p>
                    <p>${todo.content}</p>
                `;
                todoList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching todos:", error);
        });
});
