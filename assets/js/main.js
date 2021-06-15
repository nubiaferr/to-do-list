//Selecionar elementos 
const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');


//cria um li 
function setLi (){
    const li = document.createElement('li');
    return li;
};

//captura o texto do input e joga no li
function setTask(inputText){
    const li = setLi();
    li.innerText = inputText;
    tasks.appendChild(li);
    cleanInput();
    setTrashBtn(li);
    saveTasks();
};

//cria tarefa ao pressionar enter
inputTask.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if (!inputTask.value) return;
        setTask(inputTask.value);
    }
});

//cria tarefa ao clicar no botão
btnTask.addEventListener('click', function (){
    if (!inputTask.value) return;
    setTask(inputTask.value);
});

//limpa tela depois que cria input
function cleanInput (){
    inputTask.value = '';
    inputTask.focus();
};

//botão apagar
function setTrashBtn (li){
    li.innerText += ' '; 
    const trashBtn = document.createElement('button');
    trashBtn.innerText = '✖';
    trashBtn.setAttribute('class', 'trash');
    li.appendChild(trashBtn);
};

//apaga tarefa de fato
document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('trash')) {
        el.parentElement.remove();
        saveTasks();
    }
});


//salva as tarefas feitas 
function saveTasks (){
    const liTasks = tasks.querySelectorAll('li');
    const tasksList = [];

    for (let task of liTasks){
        let taskText = task.innerText;
        taskText = taskText.replace('X',' ').trim();
        tasksList.push(taskText);
    }
    const tasksJSON = JSON.stringify(tasksList);
    localStorage.setItem('tasks', tasksJSON);
}


//garante que as tarefas não sumam quando atualizar ou fechar o navegador
function addSaveTasks (){
    const tasks = localStorage.getItem('tasks');
    const tasksList = JSON.parse(tasks);
    
    for (let task of tasksList){
        setTask(task);
    }
}

addSaveTasks();