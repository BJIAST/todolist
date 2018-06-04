class Tasks {
    constructor(name, todo) {
        this._newTask(name, todo);
    }

    static _render() {
        let container = document.getElementById('tasks');
        container.innerHTML = '';

       if(this._tasksArr.length > 0){
          this._tasksArr.sort((prev, curr) => {
               return prev.status > curr.status;
           });
       }

        for (let i = 0; i < this._tasksArr.length; i++) {
            container.innerHTML += `<div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text" style="text-decoration: ${ this._tasksArr[i].status ? 'line-through' : '' } ">
                        <span class="card-title">${this._tasksArr[i].name}</span>
                        <p>${this._tasksArr[i].todo}</p>
                    </div>
                    <div class="card-action">
                        <a href="#!" data-id="${i}" class="task_done" style="display: ${ this._tasksArr[i].status ? 'none' : '' } ">Done!</a>
                        <a href="#!" data-id="${i}" class="delete_task">Delete</a>
                    </div>
                </div>
            </div>`;
        }
    }

    _newTask(name, todo) {
        let newTask = {name, todo, status: false};
        Tasks._tasksArr.unshift(newTask);
        localStorage.setItem('tasks', JSON.stringify(Tasks._tasksArr));
        Tasks._render();
    }

    static init() {
        this._tasksArr = JSON.parse(localStorage.getItem('tasks')) || [{name: 'Clear Task', todo: 'Do something', status: false}];
        console.log(`Таски:`, this._tasksArr.length);
        this._render();
    }

    static deleteTask(id) {
        this._tasksArr.splice(id, 1);
        localStorage.setItem('tasks', JSON.stringify(this._tasksArr));
        this._render();

    }
    static doneTask(id) {
        this._tasksArr[id].status = true;
        localStorage.setItem('tasks', JSON.stringify(this._tasksArr));
        this._render();
    }
}

window.onload = function () {
    Tasks.init();

    let control = {
        taskName: document.querySelector('#task_name'),
        todoText: document.querySelector('#todo_text'),
        saveBtn: document.querySelector('#save_task'),
        deleteTaskBtn: document.querySelectorAll('.delete_task'),
        doneTaskBtn:  document.querySelectorAll('.task_done')
    };

    updateEventListeners();



    function updateEventListeners(){
        // save btn
        control.saveBtn.onclick = () => {
            new Tasks(control.taskName.value, control.todoText.value);
            control.taskName.value = '';
            control.todoText.value = '';
            updateEventListeners();
        };

        // delete task btns
        control.deleteTaskBtn = document.querySelectorAll('.delete_task');
        control.deleteTaskBtn.forEach(btn => {
            btn.onclick = () => {
                Tasks.deleteTask(btn.getAttribute("data-id"));
                updateEventListeners();
            };
        });


        // done task btns
        control.doneTaskBtn = document.querySelectorAll('.task_done');
        control.doneTaskBtn.forEach(btn => {
            btn.onclick = () => {
                Tasks.doneTask(btn.getAttribute("data-id"));
                updateEventListeners();
            };
        });
    }

};
