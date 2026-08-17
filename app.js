document.addEventListener("DOMContentLoaded",()=>{
  const body=document.body;
  const theme=localStorage.getItem("driveease-theme");
  if(theme==="dark") body.classList.add("dark");
  const themeBtn=document.getElementById("themeToggle");
  if(themeBtn) themeBtn.addEventListener("click",()=>{body.classList.toggle("dark");localStorage.setItem("driveease-theme",body.classList.contains("dark")?"dark":"light");themeBtn.textContent=body.classList.contains("dark")?"☀":"☾"});
  document.querySelectorAll(".menu-toggle").forEach(b=>b.addEventListener("click",()=>document.querySelector(".nav-links")?.classList.toggle("open")));
  const featured=document.getElementById("featuredCars");
  if(featured) featured.innerHTML=cars.slice(1,4).map(carCard).join("");
  const grid=document.getElementById("carGrid");
  if(grid){ setupCatalogue(); renderCars(); }
  const home=document.getElementById("homeSearch");
  if(home) home.addEventListener("submit",e=>{e.preventDefault();const q=document.getElementById("homeSearchInput").value;const c=document.getElementById("homeCategory").value;sessionStorage.setItem("carSearch",q);sessionStorage.setItem("carCategory",c);location.href="cars.html"});
});
function carCard(c){
 return `<article class="car-card"><div class="car-image-wrap"><img src="${c.image}" alt="${c.name}" loading="lazy"><span class="badge">${c.category}</span><span class="status">● Available</span></div><div class="car-body"><div class="car-title-row"><h3>${c.name}</h3><div class="price"><strong>₹${c.price.toLocaleString()}</strong>/day</div></div><div class="car-meta"><span class="meta-pill">⛽ ${c.fuel}</span><span class="meta-pill">👥 ${c.seats} seats</span><span class="meta-pill">⚙ ${c.transmission}</span></div><div class="card-actions"><button class="btn btn-outline" onclick="showShowroom(${c.id})">Explore</button><a class="btn btn-primary" href="booking.html?car=${c.id}">Book now</a></div></div></article>`;
}
function setupCatalogue(){
 const search=document.getElementById("carSearch"),cat=document.getElementById("categoryFilter"),fuel=document.getElementById("fuelFilter"),sort=document.getElementById("sortCars");
 search.value=sessionStorage.getItem("carSearch")||"";cat.value=sessionStorage.getItem("carCategory")||"";
 [search,cat,fuel,sort].forEach(x=>x.addEventListener("input",renderCars));
 document.getElementById("clearFilters").addEventListener("click",()=>{search.value="";cat.value="";fuel.value="";sort.value="featured";sessionStorage.clear();renderCars()});
}
function renderCars(){
 let list=[...cars],q=(document.getElementById("carSearch")?.value||"").toLowerCase(),cat=document.getElementById("categoryFilter")?.value||"",fuel=document.getElementById("fuelFilter")?.value||"",sort=document.getElementById("sortCars")?.value||"featured";
 list=list.filter(c=>(c.name+" "+c.category).toLowerCase().includes(q)&&(!cat||c.category===cat)&&(!fuel||c.fuel===fuel));
 if(sort==="low") list.sort((a,b)=>a.price-b.price); if(sort==="high") list.sort((a,b)=>b.price-a.price); if(sort==="name") list.sort((a,b)=>a.name.localeCompare(b.name));
 document.getElementById("carGrid").innerHTML=list.length?list.map(carCard).join(""):`<div class="empty-state" style="grid-column:1/-1">No cars match your filters. Try another search.</div>`;
 document.getElementById("resultCount").textContent=`${list.length} vehicle${list.length!==1?"s":""} found`;
}
function showToast(msg){const old=document.querySelector(".toast");if(old)old.remove();const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),3000)}