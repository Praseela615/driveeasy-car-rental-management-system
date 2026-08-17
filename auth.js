document.addEventListener("DOMContentLoaded",()=>{
 const form=document.getElementById("loginForm");if(!form)return;
 form.addEventListener("submit",e=>{e.preventDefault();const email=document.getElementById("loginEmail").value.trim();localStorage.setItem("driveease-user",JSON.stringify({email,loginAt:new Date().toISOString()}));const m=document.getElementById("loginMessage");m.textContent="Demo login successful. Welcome to DriveEase!";m.style.color="#2b7b49";setTimeout(()=>location.href="index.html",900)})
});