//유저가 input에 값을 입력한다. 
// + 버튼을 클릭릭하면 , 할일이 추가된다 
//delete 버튼을 누르면 할일이 삭제된다 
//check 버튼을 누르면 해당 row의 ui가 변한다 
//All, Not Done , Done 을 클릭하면 언더바가 이동한다.
//All, Not Done , Done  에 따른 to-do-list가 변한다.

let taskList=[];
let filteredList=[];
let mode = 'all';


let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll(".task-tabs div")
let horizontalUnderline = tabs[0]

for(let i = 1 ; i< tabs.length; i++) {
    tabs[i].addEventListener('click',function(event){filter(event)})
    tabs[i].addEventListener('click',function(event){horizontalIndicator(event)})
  }
addButton.addEventListener('click', addTask)


function addTask() {
  let task = {
    id : randomIdGenerator(), 
    taskContent:taskInput.value,
    isComplete : false
    }
  taskList.push(task);
  render();
  console.log(task)
}

function render(){
  let list = [];
  if(mode=="all" ){
      list = taskList
  }else if(mode =="ongoing" || mode == "done"){
      list = filteredList
  } 

  

  console.log(list , mode)

  let resultHTML = '';

  for( let i =0 ; i < list.length ; i++ ) {
    if(list[i].isComplete == true){
      resultHTML += `
      <div class = "task">
      <div class = "task-done">${list[i].taskContent} </div> 
        <div>
          <button id="ch" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button id='del' onclick="deletes('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div> `
    }else{
      resultHTML += `
      <div class = "task">
      <div>${list[i].taskContent} </div> 
        <div>
          <button id="ch" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button id='del' onclick="deletes('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div> `
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}


function toggleComplete(id) {
  console.log(id)
  for(let i =0 ; i< taskList.length ; i++){
    if(taskList[i].id == id){
      taskList[i].isComplete= !taskList[i].isComplete;
      console.log(taskList)
      break;
    }
  }
  render();
}

function deletes(id){
    for (let i =0 ; i < taskList.length ; i++) {  
      if(taskList[i].id==id) { 
        taskList.splice(i,1);
      }
    }
    render();
  }

function filter(event){
  mode = event.target.id;
  filteredList= [];
  if(mode == "all"){
      render();
  }
  else if (mode == "ongoing"){
      for(let i =0 ; i < taskList.length ; i++){
          if(taskList[i].isComplete== false){
            filteredList.push(taskList[i]);
          }
      }
      render();
  }
  else{
    for(let i =0 ; i < taskList.length ; i++){
      if(taskList[i].isComplete== true){
        filteredList.push(taskList[i]);
      }
  }
  render();
  }
  }

function horizontalIndicator(event){
  horizontalUnderline.style.left= event.currentTarget.offsetLeft+"px"; 
  horizontalUnderline.style.width= event.currentTarget.offsetWidth+"px";
  horizontalUnderline.style.top= event.currentTarget.offsetTop + event.currentTarget.offsetHeight+"px";

}



function randomIdGenerator(){
  return "_"+Math.random().toString(36).substring(2,9)
  }