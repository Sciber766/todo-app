const input = document.querySelector('.addTasks');
let btn = document.querySelector('button');
const taskList = document.querySelector('#tasks');

display();
btn.addEventListener('click', ()=>{
    let dueDate = document.querySelector('.date');
    if(input.value != ""){
        if(dueDate.value !=""){
            dueDate.style.borderColor = "#007bff";
            addTask({ text: input.value, completed: false, dueDate: dueDate.value});
        }
        else{
            dueDate.style.borderColor = "red";
            giveAlert("Enter due date");
        }
        dueDate.value = "";
    }
    else{
        giveAlert("Enter your task first");
    }
});

function dltTask(item){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log( tasks);
    tasks.splice(tasks.findIndex((task)=> task.text === item.firstChild),1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    item.remove();
}

function addTask(task){
    input.value = "";
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let index = tasks.findIndex((tsk) => tsk.text === task.text && tsk.dueDate === task.dueDate);

    if(index == -1){
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // displaying the item in the screen

        let li = document.createElement('li');
        li.innerText = task.text;
        li.style.animation = "fadeIn 0.3s ease-in-out";
        if(task.completed){
            li.classList.add('checked')
        }
        taskList.appendChild(li);
        
        //attaching delete buttons
        let dlt = document.createElement('span');
        dlt.onclick = ()=>{
            let item =dlt.parentElement;
            item.style.animation = "fadeOut 0.3s ease-in-out";
            setTimeout(()=>{
                dltTask(dlt.parentElement);
            }, 260);
        }
        dlt.innerText = "\u00d7";
        dlt.style.margin ="0 5px"
        li.appendChild(dlt);

        // attaching date
        let dueDate = document.createElement('span')
        dueDate.innerText = task.dueDate;
        dueDate.classList.add('dueDate');
        li.appendChild(dueDate);

        // comparing dates
        let today = new Date().toISOString().split('T')[0];
        if(task.dueDate <= today){
        li.classList.add('expired')
    }
    }
    
    
}

function display(){
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    for(task of tasks){
        let li = document.createElement('li');
        li.innerText = task.text;
        if(task.completed){
            li.classList.add('checked')
        }
        taskList.appendChild(li);

        //attaching delete buttons
        let dlt = document.createElement('span');
        dlt.onclick = ()=>{
            let item =dlt.parentElement;
            item.style.animation = "fadeOut 0.3s ease-in-out";
            setTimeout(()=>{
                dltTask(dlt.parentElement);
            }, 260);
        }
        dlt.innerText = "\u00d7";
        dlt.style.margin ="0 5px"
        li.appendChild(dlt);

        // attaching date
        let dueDate = document.createElement('span')
        dueDate.innerText = task.dueDate;
        dueDate.classList.add('dueDate');
        li.appendChild(dueDate);

        // comparing dates
        let today = new Date().toISOString().split('T')[0];
        
        if(task.dueDate <= today){
            li.classList.add('expired');
            console.log(li.firstChild);
            giveAlert(`Due date reached for task: ${li.firstChild.textContent}`);
        }
    }
}


taskList.addEventListener('click', function (event){
    if(event.target.tagName == 'LI'){
        let li = event.target;
        li.classList.toggle('checked');
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let text = event.target.firstChild.textContent;
        let dueDate = event.target.childNodes[2].innerText;

        // findIndex is used for value based comparisons
        let index = tasks.findIndex( task => task.text === text && task.dueDate === dueDate );
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})

function giveAlert(text){
    let alert = document.createElement('div')
    let body = document.querySelector('body');
    alert.classList.add('alert');
    alert.innerText = text;
    body.appendChild(alert);

    // attaching delete button 
    let remove = document.createElement('span');
        remove.onclick = ()=>{
            let item =remove.parentElement;
            item.style.animation = "fadeOut 0.3s ease-in-out";
            setTimeout(()=>{
                remove.parentElement.remove();
            }, 260);
        }
        remove.innerText = "\u00d7";
        remove.classList.add('removeAlert');
        remove.style.margin ="0 5px"
        alert.appendChild(remove);

    // deleting automatically
    setTimeout(() => {
        let item =remove.parentElement;
        item.style.animation = "fadeOut 0.5s ease-in-out";
        setTimeout(() => {
            remove.parentElement.remove();
        }, 500);
    }, 5000);
}