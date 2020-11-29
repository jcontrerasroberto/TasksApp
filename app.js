document.getElementById("formTask").addEventListener('submit', addTasks);

function addTasks(e) {
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
  insertTaskUI();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function insertTaskUI(){
  let tasks = getTasks();
  let tasksview = document.getElementById('tasks');
  tasksview.innerHTML = '';
  tasksview.innerHTML+='<h3 class="mb-2">Important</h3>';
  for (var i = tasks.length-1; i >= 0; i--) {
    let title= tasks[i].title;
    let description= tasks[i].description;
    let priority = tasks[i].priority;
    if(priority==="High"){
      tasksview.innerHTML +=
      `<div class="card mb-3 col-md-5 d-inline-block mr-2 border-warning">
        <div class="card-body">
          <h4><strong>${title}</strong></h4><h5>${description}</h5>
          <a class="btn btn-info mt-4 btn-block" onclick="editTask('${title}', '${description}', '${priority}')">Edit</a>
          <a class="btn btn-danger mt-2 btn-block" onclick="deleteTask('${title}')">Delete</a>
        </div>
      </div>`;
    }
  }

  tasksview.innerHTML+="<br>";
  tasksview.innerHTML+='<h3 class="mb-2">More or less important</h3>';

  for (var i = tasks.length-1; i >= 0; i--) {
    let title= tasks[i].title;
    let description= tasks[i].description;
    let priority = tasks[i].priority;
    if(priority==="Medium"){
      tasksview.innerHTML +=
      `<div class="card mb-3 col-md-5 d-inline-block mr-2 border-warning">
        <div class="card-body">
          <h4><strong>${title}</strong></h4><h5>${description}</h5>
          <a class="btn btn-info mt-4 btn-block" onclick="editTask('${title}', '${description}', '${priority}')">Edit</a>
          <a class="btn btn-danger mt-2 btn-block" onclick="deleteTask('${title}','${description}','${priority}')">Delete</a>
        </div>
      </div>`;
    }
  }

  tasksview.innerHTML+="<br>";
  tasksview.innerHTML+='<h3 class="mb-2">Not too important</h3>';

  for (var i = tasks.length-1; i >= 0; i--) {
    let title= tasks[i].title;
    let description= tasks[i].description;
    let priority = tasks[i].priority;
    if(priority==="Low"){
      tasksview.innerHTML +=
      `<div class="card mb-3 col-md-5 d-inline-block mr-1 border-warning">
        <div class="card-body">
          <h4><strong>${title}</strong></h4><h5>${description}</h5>
          <a class="btn btn-info mt-4 btn-block" onclick="editTask('${title}', '${description}', '${priority}')">Edit</a>
          <a class="btn btn-danger mt-2 btn-block" onclick="deleteTask('${title}','${description}','${priority}')">Delete</a>
        </div>
      </div>`;
    }
  }

  tasksview.innerHTML+="<br><br>";
}

function deleteTask(title){
  var confirm = window.confirm("Estas seguro que quieres eliminar: "+title);
  if (confirm == true) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (var i = 0; i < tasks.length; i++) {
      if (title==tasks[i].title) {
        tasks.splice(i,1);
      }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    insertTaskUI();
  }
}

function editTask(titleOriginal,descriptionOriginal,priorityOriginal){
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  let priority = document.getElementById('priority');
  title.value = titleOriginal;
  description.value = descriptionOriginal;
  priority.value = priorityOriginal;
}

insertTaskUI();
