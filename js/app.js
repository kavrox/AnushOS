function getFormattedDate(date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function updateClock() {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else if (hour < 21) greeting = "Good Evening";
  else greeting = "Good Night";

  document.getElementById("greeting").innerText =
    `${greeting}, Anush`;

  document.getElementById("fullDate").innerText =
    getFormattedDate(now);

  document.getElementById("liveTime").innerText =
    now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

/* STATE */

let saved = JSON.parse(localStorage.getItem("lifeOS"));

let state = {
  daily: saved?.daily || [],
  weekly: saved?.weekly || [],
  todos: saved?.todos || [],
  dates: saved?.dates || [],
  streak: saved?.streak || 0,
  lastDailyReset: saved?.lastDailyReset || null,
  lastWeeklyReset: saved?.lastWeeklyReset || null
};

function save() {
  localStorage.setItem("lifeOS", JSON.stringify(state));
}

function getWeekNumber(d) {
  const date = new Date(d);
  date.setHours(0,0,0,0);
  date.setDate(date.getDate() + 4 - (date.getDay()||7));
  const yearStart = new Date(date.getFullYear(),0,1);
  return Math.ceil((((date - yearStart) / 86400000) + 1)/7);
}

function resetLogic() {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const currentWeek = getWeekNumber(now);

  if (state.lastDailyReset !== todayStr) {
    const allDone =
      state.daily.length > 0 &&
      state.daily.every(t => t.completed);

    if (allDone) state.streak++;
    else state.streak = 0;

    state.daily.forEach(t => t.completed = false);
    state.lastDailyReset = todayStr;
  }

  if (state.lastWeeklyReset !== currentWeek) {
    state.weekly.forEach(t => t.completed = false);
    state.lastWeeklyReset = currentWeek;
  }

  save();
}

/* RENDERING */

function renderHeaderStats() {
  const completed = state.daily.filter(t=>t.completed).length;
  const total = state.daily.length;

  document.getElementById("streakCount").innerText = state.streak;
  document.getElementById("todayCompletion").innerText =
    `${completed}/${total}`;
}

function renderList(list, elementId, type) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <span>${item.title}</span>
      <span>
        <input type="checkbox" ${item.completed?"checked":""}
        onchange="toggle('${type}','${item.id}')">
        <button onclick="removeItem('${type}','${item.id}')">x</button>
      </span>
    `;

    container.appendChild(div);
  });
}

function renderDates() {
  const container = document.getElementById("dateList");
  container.innerHTML = "";

  const sorted = [...state.dates].sort(
    (a,b)=> new Date(a.date)-new Date(b.date)
  );

  sorted.forEach(d=>{
    const today = new Date();
    today.setHours(0,0,0,0);

    const eventDate = new Date(d.date);
    eventDate.setHours(0,0,0,0);

    const days =
      Math.floor((eventDate - today)/86400000);

    let cls="";
    if(days<0) cls="red";
    else if(days<=1) cls="red";
    else if(days<=2) cls="orange";
    else if(days<=7) cls="yellow";

    const div=document.createElement("div");
    div.className=`task ${cls}`;
    div.innerHTML=`
      <span>${d.title} (${d.date})</span>
      <button onclick="removeDate('${d.id}')">x</button>
    `;

    container.appendChild(div);
  });
}

function renderAll(){
  renderHeaderStats();
  renderList(state.daily,"dailyList","daily");
  renderList(state.weekly,"weeklyList","weekly");
  renderList(state.todos,"todoList","todos");
  renderDates();
}

/* ACTIONS */

function toggle(type,id){
  const item=state[type].find(t=>t.id===id);
  item.completed=!item.completed;
  save();
  renderAll();
}

function removeItem(type,id){
  state[type]=state[type].filter(t=>t.id!==id);
  save();
  renderAll();
}

function removeDate(id){
  state.dates=state.dates.filter(d=>d.id!==id);
  save();
  renderAll();
}

function addDaily(){
  const title=prompt("Daily Task:");
  if(!title) return;
  state.daily.push({id:crypto.randomUUID(),title,completed:false});
  save(); renderAll();
}

function addWeekly(){
  const title=prompt("Weekly Task:");
  if(!title) return;
  state.weekly.push({id:crypto.randomUUID(),title,completed:false});
  save(); renderAll();
}

function addTodo(){
  const title=prompt("Todo:");
  if(!title) return;
  state.todos.push({id:crypto.randomUUID(),title,completed:false});
  save(); renderAll();
}

function addDate(){
  const title=document.getElementById("dateTitleInput").value.trim();
  const date=document.getElementById("dateInput").value;
  if(!title||!date) return;

  state.dates.push({id:crypto.randomUUID(),title,date});
  document.getElementById("dateTitleInput").value="";
  document.getElementById("dateInput").value="";

  save(); renderAll();
}

resetLogic();
renderAll();