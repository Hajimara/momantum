const form = document.querySelector('.js-form'),
    input = form.querySelector('input'),
    greeting = document.querySelector('.js-greetings');


const USER_LS = 'currentUser',
    SHOWING = 'showing';

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // new 
        askForName();
    }else{
        // existing
        paintGreeting(currentUser);
    }
}

function askForName() {
    form.classList.add(SHOWING);
    form.addEventListener('submit',handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();
    const userName = input.value;
    paintGreeting(userName);
    saveName(userName);
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function paintGreeting(text){
    form.classList.remove(SHOWING);
    greeting.classList.add(SHOWING);
    greeting.innerText = `Hello ${text}`;
}

function init(){
    loadName();
}

init();