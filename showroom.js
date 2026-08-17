function showShowroom(id){
 const car=cars.find(c=>c.id===Number(id)); if(!car)return;
 const modal=document.getElementById("showroomModal");
 modal.innerHTML=`<div class="showroom" role="dialog" aria-modal="true">
 <div class="showroom-head"><div><span class="eyebrow">${car.category.toUpperCase()} EXPERIENCE</span><h2>${car.name}</h2><p>${car.engine} · ${car.power} · ${car.transmission}</p></div><button class="close-modal" onclick="closeShowroom()">×</button></div>
 <div class="showroom-main"><div><div id="viewer" class="viewer"><img id="showroomImage" src="${car.image}" alt="${car.name}"><span id="viewerLabel" class="viewer-label">Exterior view</span></div>
 <div class="showroom-controls"><button class="control-btn active" onclick="showView('exterior',this)">🚗 Exterior</button><button class="control-btn" onclick="showView('interior',this)">🪑 Interior</button><button class="control-btn" onclick="showView('dashboard',this)">🖥 Dashboard</button><button class="control-btn" onclick="toggleFeature('door',this)">🚪 Open Door</button><button class="control-btn" onclick="toggleFeature('window',this)">🪟 Open Windows</button><button class="control-btn" onclick="toggleFeature('sunroof',this)">☀ Sunroof</button></div>
 <div class="showroom-tabs"><button class="control-btn active" onclick="showTab('specs',this)">Specifications</button><button class="control-btn" onclick="showTab('features',this)">Features</button></div></div>
 <div id="showroomInfo"></div></div></div>`;
 modal.classList.remove("hidden"); showTab("specs",modal.querySelector(".showroom-tabs .active"));
}
function closeShowroom(){document.getElementById("showroomModal")?.classList.add("hidden")}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeShowroom()});
function showView(view,btn){
 const img=document.getElementById("showroomImage"),label=document.getElementById("viewerLabel"),car=getCurrentCar();
 if(!car)return;
 document.querySelectorAll(".showroom-controls .control-btn").forEach((b,i)=>{if(i<3)b.classList.remove("active")});btn.classList.add("active");
 img.src=view==="interior"?car.interior:view==="dashboard"?car.dashboard:car.image;label.textContent=view==="interior"?"Interior / cabin view":view==="dashboard"?"Digital dashboard view":"Exterior view";
 document.getElementById("viewer").classList.remove("door-open","window-open");
}
function toggleFeature(type,btn){
 const viewer=document.getElementById("viewer");btn.classList.toggle("active");
 if(type==="door"){viewer.classList.toggle("door-open");document.getElementById("viewerLabel").textContent=btn.classList.contains("active")?"Door opened · side access":"Exterior view"}
 if(type==="window"){viewer.classList.toggle("window-open");document.getElementById("viewerLabel").textContent=btn.classList.contains("active")?"Windows lowered · ventilation mode":"Exterior view"}
 if(type==="sunroof"){document.getElementById("viewerLabel").textContent=btn.classList.contains("active")?"Panoramic sunroof opened":"Sunroof closed"}
}
function getCurrentCar(){const h=document.querySelector(".showroom h2")?.textContent;return cars.find(c=>c.name===h)}
function showTab(tab,btn){
 const car=getCurrentCar(); if(!car)return;
 document.querySelectorAll(".showroom-tabs .control-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 document.getElementById("showroomInfo").innerHTML=tab==="specs"?`<div class="spec-grid">${[["Engine",car.engine],["Power",car.power],["Fuel",car.fuel],["Transmission",car.transmission],["Seats",car.seats],["Mileage/Range",car.mileage],["Top speed",car.topSpeed],["Price",`₹${car.price.toLocaleString()}/day`]].map(x=>`<div class="spec"><small>${x[0]}</small><strong>${x[1]}</strong></div>`).join("")}</div>${car.luxury?`<div class="luxury-box"><h3>✨ Luxury Experience</h3><ul class="luxury-list">${car.features.map(f=>`<li>${f}</li>`).join("")}</ul></div>`:""}<a class="btn btn-primary btn-wide" style="margin-top:18px" href="booking.html?car=${car.id}" onclick="closeShowroom()">Book this car →</a>`:`<div class="luxury-box"><h3>${car.luxury?"✨ Unique luxury features":"⭐ Included features"}</h3><ul class="luxury-list">${car.features.map(f=>`<li>${f}</li>`).join("")}</ul></div><a class="btn btn-primary btn-wide" style="margin-top:18px" href="booking.html?car=${car.id}">Book this car →</a>`;
}