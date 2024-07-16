document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const tasksList = document.getElementById('tasks-list');

    const fetchTasks = async () => {
        const res = await fetch('/api/tasks', {
            headers: { 'Authorization': Bearer ${token} }
        });
        const tasks = await res.json();
        tasksList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = ${task.title} - ${task.description} - ${task.dueDate};
            tasksList.appendChild(li);
        });
    };
    fetchTasks();

    document.getElementById('task-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const dueDate = document.getElementById('task-due-date').value;
        await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Bearer ${token}
            },
            body: JSON.stringify({ title, description, dueDate })
        });
        fetchTasks();
    });
})