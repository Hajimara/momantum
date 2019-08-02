const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    console.log(li);
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter((todo)=>{
        return todo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos(toDos);
}

function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerText = 'Delete';
    delBtn.addEventListener('click',deleteToDo);
    li.id = newId;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    } 
    toDos.push(toDoObj);
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach((toDo) =>{
            paintToDo(toDo.text);
        });
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener('submit',handleSubmit);
}

init();
