const toDoInput = document.querySelector('#todo-input')
const toDoAdd = document.querySelector('#add-todo')
const toDoList = document.querySelector('#todo-list')

toDoListRender()
addingToDO()

function toDoListRender() {
    fetch('http://localhost:3000/todo/')
        .then(res => res.json())
        .then(data => {
        data.forEach(todo => {
            toDoList.insertAdjacentHTML('beforeend',`<li data-editing="false" data-isDeleting="false" data-id="${todo.id}">
                <input type="checkbox" class="to-do-checkbox" />
                <p class="ToDoValue">${todo.user}</p>
                <input
                  type="text"
                  class="ToDoEditValueInput"
                  style="display: none"
                />
                <button class="ToDoItemEdit">Edit</button>
                <button class="ToDoItemDelete">Delete</button>
              </li>`)
        });
        })
        .catch(error => console.log(error))
}

function addingToDO() {
    toDoAdd.addEventListener('click', () => {
        if (toDoInput.value.trim() === '') {
            return alert ('Write something')
        } else {
            fetch('http://localhost:3000/todo/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({user: toDoInput.value})
            })
                .then(res => res.json())
                .then(data => {
                    toDoList.insertAdjacentHTML('beforeend',`<li data-editing="false" data-id="${data.id}">
                        <input type="checkbox" class="to-do-checkbox" />
                        <p class="ToDoValue">${data.user}</p>
                        <input
                          type="text"
                          class="ToDoEditValueInput"
                          style="display: none"
                        />
                        <button class="ToDoItemEdit">Edit</button>
                        <button class="ToDoItemDelete">Delete</button>
                      </li>`)
                })
                .catch(error => console.log(error))
            
            toDoInput.value = ''
        }
    })
    toDoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          toDoAdd.click();
        }
    });
}

toDoList.addEventListener('click', (e) => {
    const li = e.target.closest('li')
    if (!li) return

    const findToDo = e.target.closest('li')
    const itemId = findToDo.dataset.id

    if (e.target.classList.contains('ToDoItemDelete')) {
        const button = e.target;

        if (button.dataset.isDeleting !== 'true') {
            button.dataset.isDeleting = 'true';
            let time = 2;

            const deleteTimeout = setTimeout(() => {
                li.remove();

                fetch(`http://localhost:3000/todo/${itemId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => console.log('ToDo is deleted'))
                    .catch(error => console.log(error))
            }, 3000);

            const cancelInterval = setInterval(() => {
                if (time !== 0) {
                    button.textContent = `Cancel ${time}`;
                    time -= 1;
                } else {
                    clearInterval(cancelInterval);
                }
            }, 1000);

            button.textContent = `Cancel 3`;
            button.dataset.deleteTimeout = deleteTimeout;
            button.dataset.cancelInterval = cancelInterval;
        } else {
            button.dataset.isDeleting = 'false';
            clearTimeout(button.dataset.deleteTimeout);
            clearInterval(button.dataset.cancelInterval);
            button.textContent = 'Delete';
        }
    }

    if (e.target.classList.contains('ToDoItemEdit')) {
        const isEditing = findToDo.dataset.editing === 'true';

        const p = findToDo.querySelector('.ToDoValue')
        const input = findToDo.querySelector('.ToDoEditValueInput')
        
        if (!isEditing) {
            findToDo.dataset.editing = 'true'
            input.value = p.textContent;
            p.style.display = 'none'
            input.style.display = 'block'
            e.target.textContent = 'Save'
        } else {
            findToDo.dataset.editing = 'false'
            p.textContent = input.value;
            p.style.display = 'block'
            input.style.display = 'none'
            e.target.textContent = 'Edit'

            fetch(`http://localhost:3000/todo/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({user: input.value})
            })
                .then(res => console.log('ToDo is changed'))
                .catch(error => console.log(error))
        }
    }

    if (e.target.classList.contains('to-do-checkbox')) {
        if (e.target.checked) {
            e.target.parentElement.classList.add('completed')
        } else {
            e.target.parentElement.classList.remove('completed')
        }
    }
})

