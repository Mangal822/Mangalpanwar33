// Simple password protection
const loginForm = document.getElementById("loginForm");
const dashboard = document.getElementById("dashboard");
const PASS = "Luxury2026"; // change this

loginForm.addEventListener("submit", e=>{
  e.preventDefault();
  const val = document.getElementById("adminPass").value;
  if(val === PASS){
    loginForm.style.display="none";
    dashboard.style.display="block";
  } else {
    alert("Incorrect Password");
  }
});

// Listings
let listings = JSON.parse(localStorage.getItem("listings")) || [];
const container = document.getElementById("listings");

function save(){ localStorage.setItem("listings", JSON.stringify(listings)); }
function render(){
  container.innerHTML="";
  listings.forEach((l,i)=>{
    container.innerHTML += `
      <div>
        <b>${l.title}</b> <span class="badge">(${l.type})</span><br>
        ${l.location || ""}<br>
        <small>${l.desc}</small><br><br>
        Status: <b>${l.active ? "LIVE" : "HIDDEN"}</b><br><br>
        <button onclick="toggle(${i})">${l.active ? "Hide" : "Approve"}</button>
        <button onclick="removeItem(${i})">Delete</button>
      </div>
    `;
  });
}

document.getElementById("assetForm").addEventListener("submit", e=>{
  e.preventDefault();
  listings.push({
    type: type.value,
    title: title.value,
    location: location.value,
    price: price.value,
    desc: desc.value,
    active: false
  });
  save(); render(); e.target.reset();
});

function toggle(i){ listings[i].active = !listings[i].active; save(); render(); }
function removeItem(i){ listings.splice(i,1); save(); render(); }

render();
