var isItImportant = false;
var serverUrl = "http://fsdi.azurewebsites.net/api";

function toggleImportant() {
  console.log("Icon clicked!!");

  if (isItImportant) {
    //change to non important
    isItImportant = false;
    $("#iImportant").removeClass("fas").addClass("fas fa-grin-squint-tears");
  } else {
    //change to important
    isItImportant = true;
    $("#iImportant").removeClass("fas fa-grin-squint-tears").addClass("fas");
  }
}

function saveTask() {
  console.log("saving!!");

  //get the values from control
  let title = $("#txtTitle").val();
  let desc = $("#txtDesc").val();
  let important = $("#iImportant").val();
  let importance = $("#selImportance").val();
  let dueDate = $("#txtDueDate").val();
  let alertText = parseInt($("#selAlert").val() || 0);
  let location = $("#txtLocation").val();

  $("#txtTitle").val("");
  $("#txtDesc").val("");
  $("#iImportant").val("");
  $("#selImportance").val("");
  $("#txtDueDate").val("");
  $("#selAlert").val("");
  $("#txtLocation").val("");

  //data validations
  if (!title) {
    $("#errortitle").removeClass("hide");
    // timer in js
    // 1param: what should do
    // 2param: how much time to wait (in milliseconds)

    setTimeout(function () {
      $("#errortitle").addClass("hide");
    }, 3000);
    //1000means one second
    return; //get out of thew function
  }

  if (!dueDate) {
    $("#errordueDate").removeClass("hide");

    setTimeout(function () {
      $("#errordueDate").addClass("hide");
    }, 3000);
    return;
  }

  if ("#btnSave") {
    $("#successAlert").removeClass("hide");

    setTimeout(function () {
      $("#successAlert").addClass("hide");
    }, 3000);
  }

  //validate due date
  //create an object
  // let task = new task(pass the perameters, second, third)
  let theTask = new Task(
    title,
    desc,
    isItImportant,
    importance,
    dueDate,
    alertText,
    location
  );

  //console.log the object
  console.log(theTask);

  // send task to server
  $.ajax({
    url: "/api/savetask",
    type: "POST",
    data: JSON.stringify(theTask),
    contentType: "application/Json",
    success: function (res) {
      console.log("Server says", res);

      displayTask(res);
    },
    error: function (error) {
      console.error("Error saving", error);
    },
  });
}

function displayTask(task) {
  let alert = "";
  switch (task.alertText) {
    case "1":
      alert = "Don't Forget to:";
      break;
    case "2":
      alert = "Stop:";
      break;
    case "3":
      alert = "Start:";
      break;
    case "4":
      alert = "Get more coffee:";
      break;
  }
  let importance = "";
  switch (task.importance) {
    case "1":
      alert = "is it important:";
      break;
    case "2":
      alert = "important:";
      break;
    case "3":
      alert = "non-important";
      break;
  }

  let class2 = task.status == 1 ? "task-done" : "";
  let doneIcon = `<i id="iDone" onClick="doneTask(${task.id})"class="fas fa-user-check"></i>`;
  let syntax = `<div id="task${task.id}" class="task ${class2}"> 
     <div class="sec-1">
     ${doneIcon}
      
      ${alert}
      <i id="iDelete" onClick="deleteTask(${task.id})" class="far fa-trash-alt"></i>
      </div>
     
      <div class="sec-2">
        
        <div class="sec-title">
          <h5>${task.title}</h5>  
          <p>${task.description}</p>
        </div>
  
        <div class="sec-date">
          <label>${task.dueDate}</label>
        </div>
  
        <div class="sec-location">
          <label>${task.location}</label>
        </div>
  
      </div>
      
    </div>`;
  if (task.status == 1) {
    $("#tasksContainer").append(syntax);
  } else {
    $("#doneContainer").append(syntax);
  }
}

function deleteTask(id) {
  console.log("deleting task now:" + id);

  $.ajax({
    url: "/api/Deletetasks/" + id,
    type: "DELETE",

    success: function () {
      console.log("task removed from server");
      $("#task" + id).remove();
      //opt2:location.reload();
    },
    error: function (details) {
      console.log("error removing", details);
    },
  });
}

//url: serverurl + "/tasks/" + id
//create the code for an ajax deleye req
function doneTask(id) {
  console.log("Done task: " + id);

  $.ajax({
    url: "/api/MarkDone/" + id,
    type: "PATCH",
    success: function (task) {
      $("#task" + id).remove();
      location.reload();
      console.log(task)
    },
    error: function (details) {
      console.log("Error removing", details);
    },
  });
}

function retreiveTasks() {
  $.ajax({
    url: "/api/getTasks",
    type: "GET",
    success: function (list) {
      console.log("Retreived", list);

      for (let i = 0; i < list.length; i++) {
        let task = list[i];
        if (task.user === "ChrisCod") {
          displayTask(task);
        }
      }
    },
    error: function (err) {
      console.error("Error reading", err);
    },
  });
}

function init() {
  console.log("Task Manager");
  //load data
  retreiveTasks();
  //hook events
  $("#iImportant").click(toggleImportant);
  $("#btnSave").click(saveTask);
  $("#btnDetails").click(function () {
    $("#details").toggle();
  });
}

window.onload = init;

function testRequest() {
  $.ajax({
    url: "https://restclass.azurewebsites.net/api/test",
    type: "GET",
    success: function (res) {
      console.log("server says", res);
    },
    error: function (errorDet) {
      console.error("Error on req", errorDet);
    },
  });
}
