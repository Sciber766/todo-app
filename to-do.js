const input = document.querySelector('input');
let btn = document.querySelector('button');
const taskList = document.querySelector('#tasks');

display();

btn.addEventListener('click', ()=>{
    if(input.value != ""){
        addTask(input.value);
    }
    display();
    input.value = "";
});

function dltTask(item){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(tasks.indexOf(item),1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    display();
}

function addTask(task){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function display(){
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for(task of tasks){
        let li = document.createElement('li');
        li.innerText = task;
        taskList.appendChild(li);

        //attaching delete buttons
        let dlt = document.createElement('span');
        dlt.onclick = ()=>{
            console.log(dlt.parentElement.firstChild.textContent);
            dltTask(dlt.parentElement.firstChild.textContent);
        }
        dlt.innerText = "\u00d7";
        dlt.style.margin ="0 5px"
        li.appendChild(dlt);
    }
}

taskList.addEventListener('click', function (event){
    if(event.target.tagName == 'LI'){
        let li = event.target;
        li.classList.toggle('checked');
    }
})