const toDoInput = document.querySelector('#todo-input')
const toDoAdd = document.querySelector('#add-todo')
const toDoList = document.querySelector('#todo-list')

toDoAdd.addEventListener('click', () => {
    if (toDoInput.value.trim() === '') {
        return alert ('Write something')
    } else {
        toDoList.insertAdjacentHTML('beforeend',`<li>
          <input type="checkbox" class="to-do-checkbox">
          <p>${toDoInput.value}</p>
          <button class ='ToDoItemDelete'>Delete</button>
        </li>`)
        toDoInput.value = ''
        
        deleteToDo()
        toDoDone()
    }
})

function deleteToDo() {
    const toDoDelete = document.querySelectorAll('.ToDoItemDelete')

    toDoDelete.forEach(button => {
        let isDeleting = false
        let deleteTimeout
        let cancelInterval

        button.addEventListener('click', () => {
            if (isDeleting === false) {
                isDeleting = true;
                let time = 2;
                deleteTimeout = setTimeout(() => {
                    button.parentElement.remove()
                }, 3000)
                cancelInterval = setInterval(() => {
                    if (time !== 0) {
                        button.textContent = `Cancel ${time}`;
                        time -= 1
                    } else {
                        return clearInterval(cancelInterval)
                    }
                }, 1000)
                button.textContent = `Cancel 3`;
            } else {
                clearTimeout(deleteTimeout)
                clearInterval(cancelInterval)
                button.textContent = 'Delete'
                isDeleting = false
            }
        })
    });
}

function toDoDone() {
    const toDoCheckbox = document.querySelectorAll('.to-do-checkbox')

    toDoCheckbox.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkbox.parentElement.classList.add('completed')
            } else {
                checkbox.parentElement.classList.remove('completed')
            }
        })
    })
}

toDoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      toDoAdd.click();
    }
  });