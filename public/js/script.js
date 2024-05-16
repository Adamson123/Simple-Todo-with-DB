import methods from "./clientMethods.js";

const {
  axios,
  fetchTasks,
  patchTask,
  deleteTask,
  createNewTask,
  resultInfoFunc,
} = methods;

let { allTasks } = methods;
const taskContainer = document.querySelector(".taskContainer");

const openEditTaskPopUp = (index) => {
  resultInfoFunc("", 1);

  const editTaskContainer = document.querySelector(".editTaskContainer");
  editTaskContainer.classList.add("active");

  const taskName = document.querySelectorAll(".taskName");
  const taskInput = document.querySelector(".editTaskInput");
  taskInput.value = taskName[index].textContent;
  document.querySelector(".saveBtn").onclick = async () => {
    const taskNewName = taskInput.value;

    if (taskNewName) {
      try {
        resultInfoFunc("Updating task...", 1);
        await patchTask(
          { newValue: taskNewName, id: allTasks[index]._id },
          "task"
        );
        renderTasks();
        editTaskContainer.classList.remove("active");
      } catch (error) {
        resultInfoFunc(error, 1);
      }
    } else {
      resultInfoFunc("Please enter task name", 1);
    }
  };

  document.querySelector(".cancelBtn").addEventListener("click", () => {
    resultInfoFunc("", 1);
    editTaskContainer.classList.remove("active");
  });
};

const renderTasks = async () => {
  allTasks = await fetchTasks();
  let html = "";
  allTasks.forEach((info) => {
    const { task, completed } = info;
    const checkClass = completed ? "bi-check-square" : "bi-square";
    const lineTclass = completed ? "completedTask" : "";
    html += `<div class="taskDiv">
   <span class="${checkClass} taskState"></span>
   <div>
   <p class="${lineTclass} taskName">${task}</p> 
   <span class="bi-pencil editTaskBtn"></span>
   <span class="bi-trash deleteTaskBtn"></span>
   </div>
 
 </div>`;
  });

  taskContainer.innerHTML = html;
  document.querySelectorAll(".taskState").forEach((box, index) => {
    box.addEventListener("click", async () => {
      let bool;
      if (allTasks[index].completed) {
        bool = false;
      } else {
        bool = true;
      }
      try {
        resultInfoFunc("Updating task...", 0);
        await patchTask(
          { newValue: bool, id: allTasks[index]._id },
          "completed"
        );
        renderTasks();
        resultInfoFunc("", 0);
      } catch (error) {
        resultInfoFunc(error, 0);
      }
    });
  });

  document.querySelectorAll(".editTaskBtn").forEach((box, index) => {
    box.addEventListener("click", () => {
      openEditTaskPopUp(index);
    });
  });
  document.querySelectorAll(".deleteTaskBtn").forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      try {
        resultInfoFunc("Deleting task...", 0);
        await deleteTask(allTasks[index]._id);
        renderTasks();
        resultInfoFunc("", 0);
      } catch (error) {
        resultInfoFunc(error, 0);
      }
    });
  });

  let taskText;
  document.querySelectorAll(".taskName").forEach((p, index) => {
    p.addEventListener("input", () => {
      if (p.textContent.length < 20) {
        taskText = p.textContent.slice(0, 20);
      }
      if (p.textContent.length >= 20) {
        p.textContent = taskText;
      }
    });
  });
};

renderTasks();

const scrollToEnd = async () => {
  taskContainer.scrollTop =
    taskContainer.scrollHeight - taskContainer.clientHeight;
};

document.querySelector(".addTaskBtn").addEventListener("click", async () => {

  try {
    resultInfoFunc("Adding New task...", 0);
    await createNewTask();
    renderTasks();
    resultInfoFunc("", 0);
    scrollToEnd();
  } catch (error) {
    resultInfoFunc(error, 0);
  }
  

});
