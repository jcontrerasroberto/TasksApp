document.getElementById("formTask").addEventListener('submit', setTasks);

function setTasks(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let priority = document.getElementById('priority').value;
  const task = {
    title,
    description,
    priority
  };

  if(localStorage.getItem('tasks')===null){
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }else{
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  insertTaskUI(tasks);
}

function insertTaskUI(tasks){
  let tasksview = document.getElementById('tasks');
  tasksview.innerHTML = '';
  tasksview.innerHTML+="<h3>Important</h3>";
  for (var i = tasks.length-1; i >= 0; i--) {
    let title= tasks[i].title;
    let description= tasks[i].description;
    let priority = tasks[i].priority;
    if(priority==="High"){
      tasksview.innerHTML +=
      `<div class="card mb-3 col-md-5 d-inline-block mr-2 border-warning">
        <div class="card-body">
          <h4><strong>${title}</strong></h4><h5>${description}</h5>
          <a class="btn btn-danger mt-4 btn-block" onclick="deleteTask('${title}')">Delete</a>
        </div>
      </div>`;
    }
  }

  tasksview.innerHTML+="<br>";
  tasksview.innerHTML+="<h3>More or less important</h3>";

  for (var i = tasks.length-1; i >= 0; i--) {
    let title= tasks[i].title;
    let description= tasks[i].description;
    let priority = tasks[i].priority;
    if(priority==="Medium"){
      tasksview.innerHTML +=
      `<div class="card mb-3 col-md-5 d-inline-block mr-2 border-warning">
        <div class="card-body">
          <h4><strong>${title}</strong></h4><h5>${description}</h5>
          <a class="btn btn-danger mt-4 btn-block" onclick="deleteTask('${title}')">Delete</a>
        </div>
      </div>`;
    }
  }

  tasksview.innerHTML+="<br>";
  tasksview.innerHTML+="<h3>Not that important but do it</h3>";

  for (var i = tasks.length-1; i >= 0; i--) {
    let title= tasks[i].title;
    let description= tasks[i].description;
    let priority = tasks[i].priority;
    if(priority==="Low"){
      tasksview.innerHTML +=
      `<div class="card mb-3 col-md-5 d-inline-block mr-1 border-warning">
        <div class="card-body">
          <h4><strong>${title}</strong></h4><h5>${description}</h5>
          <a class="btn btn-danger mt-4 btn-block" onclick="deleteTask('${title}')">Delete</a>
        </div>
      </div>`;
    }
  }

  tasksview.innerHTML+="<br><br>";
}

function deleteTask(title){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for (var i = 0; i < tasks.length; i++) {
    if (title==tasks[i].title) {
      tasks.splice(i,1);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

getTasks();
