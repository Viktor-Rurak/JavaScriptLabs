const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const inpt = document.getElementById('input-todo');


let todos = [] 

function newTodo() {
  const text = inpt.value;

  const todo = {
    id: Date.now(),
    text: text,
    checked: false
  }

  todos.push(todo)
  render()
}


function render() {

  list.innerHTML = ''

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = classNames.TODO_ITEM

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = classNames.TODO_CHECKBOX
    checkbox.checked = todo.checked
    checkbox.addEventListener('change', () => {
      todo.checked = !todo.checked
      updateCounters()
    })

    
    const span = document.createElement('span')
    span.className = classNames.TODO_TEXT
    span.textContent = todo.text
    if (todo.checked) span.style.textDecoration = 'line-through'

 
    const delButton = document.createElement('button')
    delButton.className = classNames.TODO_DELETE
    delButton.textContent = '✕'
    delButton.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id)
      render()
    })

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(delButton)

    list.appendChild(li)
  })

  updateCounters()
}


function updateCounters() {
  itemCountSpan.textContent = todos.length
  const uncheckedCount = todos.filter(t => !t.checked).length
  uncheckedCountSpan.textContent = uncheckedCount
}
