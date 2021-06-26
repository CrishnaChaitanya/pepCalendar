let nav = 0;
let filter_check = 4;
let results="";
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
var clickeddate;
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let touched;
let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      //later aligator
      let result = this.responseText
      results = JSON.parse(result)
      // console.log(results);
    }
  }
function loadEvents(){    //loadComments
  //Ajax here
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      //later aligator
      let result = this.responseText
      results = JSON.parse(result)
      load(results);  //most importatn
      results.forEach(comment => {
       

        // axios
        
      });
    }
  }
xhttp.open("GET","/home",true)  //open a 'get' request , its async
xhttp.send()
  
}



function openModal(date) {
  clicked = date;
  clickeddate = date;


  const eventForDay = results.find(e => e.date === clicked);
  if (eventForDay) {
    var dateToEnter = date;
    // localStorage.setItem("dateToEnter",dateToEnter); // $$$$$$
    document.getElementById('subject').innerText = eventForDay.Description;
    document.getElementById('teacher').innerText = eventForDay.Name;
    deleteEventModal.style.display = 'block';
  } else {
    let tempo = document.getElementsByClassName("Test")
    if (tempo.length === 3){
      let parent = document.getElementById("newEventModal")
      let myObj = document.getElementById("plusid")
      parent.removeChild(myObj)
    }
    newEventModal.style.display = 'block';
  }
  backDrop.style.display = 'block';
}

function load(results) {

    // document.getElementById("calender").innerText=""

  // console.log(results);
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
  
  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })}`;

  document.getElementById('yearDisplay').innerText = 
    `${year}`;



  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${year}-${month + 1}-${i - paddingDays}`;
    // 01/01/2021
    // console.log(dayString);

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = results.find(e => e.date === dayString);
      // console.log(eventForDay);
      // console.log("Milestone"+eventForDay.date);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {    //evntForDay is an object
        // console.log("cehcking");
        // results.forEach(comment => {
          // console.log(comment.date+".............."+dayString);
          // if(comment.date == dayString){

            const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.Description;
        daySquare.appendChild(eventDiv);
          }
        
        
      

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
  filter(filter_check)
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load(results);
} 

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

// function deleteEvent() {
//   events = results.filter(e => e.date !== clicked);   //deleted the event but have to to update the sql i think
//   console.log("😍"+clicked); //clicked stores the date of the event clicked so ..
//   localStorage.setItem('events', JSON.stringify(events));
//   closeModal();
// }

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load(results);
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load(results);
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteComment);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}
function thisfunc(){
  alert("asdasdasd")
}
function insertComment(){
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
    //TODO : cpde esponse display the new events in the calender
    let result = this.responseText
    // console.log("%%%"+result); 
      
    }

  }
  let addClass = document.getElementsByClassName("Test") 
  let description = addClass[0].value
  let name = addClass[1].value
  let date = ""
  // console.log("I'm"+addClass)
  // console.log(addClass.length)
  if (addClass.length==2){
    date = clickeddate;
  }
  else if(addClass.length == 3){
    let edate = addClass[2].value;
    let junk1 = edate.slice(8)
  let d = Number(junk1).toString()
  let junk =  edate.slice(5,7)
  let m = Number(junk).toString()
  let y = edate.slice(0,4)
  date = y+"-"+m+"-"+d
  } 
  //2021-06-07
  //year/month/day --> mySQL
  // let junk1 = date.slice(8)
  // let d = Number(junk1).toString()
  // let junk =  date.slice(5,7)
  // let m = Number(junk).toString()
  // let y = date.slice(0,4)
  // let finaldate = y+"-"+m+"-"+d
  // console.log(y+"-"+m+"-"+d);
  // console.log(finaldate);


  xhttp.open("POST", "/insert",true)
  xhttp.setRequestHeader("Content-Type","application/json")
  xhttp.send('{"description":"'+description+'","name":"'+name+'","Date":"'+date+'"}')
  // load(results)
  // touched = true
  // console.log("🤦‍♀️😌😕")
  setInterval(() => {
    loadEvents()  
  }, 2000);
  
}

function deleteComment() {
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){}}
  let temp = clicked
  xhttp.open("DELETE","/delete",true)
  xhttp.setRequestHeader("Content-Type","application/json")
  // console.log(temp);
  xhttp.send('{"clicked":"'+temp+'"}')
  closeModal();
  // load(results)
  loadEvents()
}

function addEve(){
  let tempo = document.getElementsByClassName("Test")
  let additional
  let parent = document.getElementById("newEventModal")
  // console.log("😤😤"+tempo.length);
  if (tempo.length === 2){

  // parent=document.getElementById("newEventModal")
  
  additional = document.createElement("input")
  additional.type = "date"
  additional.className="Test"
  additional.id="plusid"
  parent.appendChild(additional)

  // let plusdate = document.getElementById("plusid").value

  // let xhttp = new XMLHttpRequest()
  // xhttp.onreadystatechange = function(){
  //   if(this.readyState == 4 && this.status == 200){
  //   //TODO : cpde esponse display the new events in the calender
  //   let result = this.responseText
  //   console.log(result); 
      
  //   }

  // }
  // let addClass = document.getElementsByClassName("Test") 
  // let description = addClass[0].value
  // let name = addClass[1].value
  // let date = plusdate;
  // console.log("😪"+date);

  // xhttp.open("POST", "/insert",true)
  // xhttp.setRequestHeader("Content-Type","application/json")
  // xhttp.send('{"description":"'+description+'","name":"'+name+'","Date":"'+date+'"}')
  // load(results)
  loadEvents()

}
newEventModal.style.display = 'block'
backDrop.style.display = 'block';
// else if (n === 1 && temo.length === 3){
// newEventModal.style.display = 'block'
//   backDrop.style.display = 'block'; 
//   let myObj = document.getElementById("plusid")
//   // parent.removeChild(additional)
//   parent.removeChild(myObj)
//   loadEvents()
// }
}

initButtons();
// load();

//check weather or not of there is an event for that day
//if there is a eevnt then - create a div, add the text for the event and put it inside daysquare m




//here    pattern="\d{4}-\d{2}-\d{2}"

//today

function today(){
  nav = 0
  load(results)
}

function clear_filter(){
  filter_check = 4
  let daySquare = document.getElementsByClassName('day');
  for(let i=0; i<daySquare.length; i++){
    daySquare[i].style.backgroundColor = "white";
  }
  if(nav == 0){
    document.getElementById("currentDay").style.backgroundColor = "#007bffeb"
  }
  const buttons = ["svg_button", "rama_button", "soujanya_button", "praneel_button"]
  buttons.forEach(element => {
    document.getElementById(element).style.backgroundColor = "#0566ffe3";
    document.getElementById(element).style.color = "white";
  });
  // document.getElementById("clear_button").style.backgroundColor = "#95dbe5ff"
}

function filter(n){
  clear_filter()
  filter_check = n;
  if(filter_check == 4){
    clear_filter()
  }else{
  const teachers = ["SVG Reddy", "P Rama Devi", "B Soujanya", "Praneel"];
  const buttons = ["svg_button", "rama_button", "soujanya_button", "praneel_button", "clear_button"]
  buttons.forEach(element => {
    document.getElementById(element).style.backgroundColor = "#0566ffe3";
    document.getElementById(element).style.color = "white";
  });
  document.getElementById(buttons[n]).style.backgroundColor = "#95dbe5ff";
  document.getElementById(buttons[n]).style.color = "black";
  let dates = []
  let teacher_name = teachers[n];
  results.forEach(comment => {
    if(comment.Name === teacher_name){
      dates.push(comment.date)
    }
  });
  console.log(dates)
  let daySquare = document.getElementsByClassName('day');
  console.log(daySquare)
  if (dates.length != 0){
    if(nav == 0){
      document.getElementById("currentDay").style.backgroundColor = "#007bffeb"
    }
  // console.log(daySquare)
  const dt = new Date()
  currentmonth = dt.getMonth() + nav + 1;
  console.log(currentmonth)
  dates.forEach(element => {
    let values = element.split("-")
    console.log(values)

    if(values[1] == currentmonth){
      for(let i = 0; i<daySquare.length; i++){
        console.log(daySquare[i].innerText.split("\n"))
        if(daySquare[i].innerText.split("\n")[0] == values[2]){
          console.log("Im here")

          daySquare[i].style.backgroundColor = "#95dbe5ff";
        }
      }
    }
  })
}else{
  clear_filter()
  document.getElementById(buttons[n]).style.backgroundColor = "#95dbe5ff"
}
  }
}
