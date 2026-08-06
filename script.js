// ===== JAM REALTIME =====
function updateClock() {
    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("id-ID");
}

setInterval(updateClock,1000);
updateClock();


// ===== LOADING =====
window.onload = () => {
    setTimeout(()=>{
        document.querySelector(".loading").style.display="none";
    },1800);
};


// ===== STATUS RANDOM =====
function random(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

setInterval(()=>{

document.getElementById("cpu").innerHTML =
random(15,65)+" %";

document.getElementById("ram").innerHTML =
random(30,80)+" %";

document.getElementById("ping").innerHTML =
random(3,25)+" ms";

},2000);


// ===== TERMINAL =====
const input=document.getElementById("terminal-input");
const output=document.querySelector(".output");

input.addEventListener("keydown",function(e){

if(e.key==="Enter"){

let cmd=input.value.trim().toLowerCase();

output.innerHTML += "<br>TNOS@linux:~$ "+cmd;

switch(cmd){

case "help":

output.innerHTML += `
<br><br>
help<br>
clear<br>
date<br>
whoami<br>
ping<br>
ifconfig<br>
neofetch
`;

break;

case "clear":

output.innerHTML="";

break;

case "date":

output.innerHTML +=
"<br>"+new Date();

break;

case "whoami":

output.innerHTML +=
"<br>administrator";

break;

case "ping":

output.innerHTML +=
"<br>Pinging google.com...";
setTimeout(()=>{
output.innerHTML +=
"<br>Reply : time=8ms";
},700);

break;

case "ifconfig":

output.innerHTML += `
<br>
eth0<br>
inet 192.168.1.10<br>
mask 255.255.255.0
`;

break;

case "neofetch":

output.innerHTML += `
<br>
====================<br>
TNOS V5 Ultimate<br>
Kernel : Linux 6.x<br>
Shell : bash<br>
CPU : Intel Xeon<br>
RAM : 16 GB<br>
Status : Online
`;

break;

default:

output.innerHTML +=
"<br>Command not found.";

}

output.scrollTop=output.scrollHeight;

input.value="";

}

});


// ===== CARD EFFECT =====
document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.03)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});


// ===== TOOL BUTTON =====
document.querySelectorAll(".tool-grid button").forEach(btn=>{

btn.onclick=()=>{

alert(btn.innerText+" akan hadir di update berikutnya 🚀");

};

});


// ===== SERVER STATUS =====
setInterval(()=>{

let s=document.getElementById("server-status");

if(Math.random()>0.1){

s.innerHTML="🟢 ONLINE";
s.style.color="#00ff99";

}else{

s.innerHTML="🟡 BUSY";
s.style.color="orange";

}

},4000);

console.log("TNOS V5 Ultimate Loaded 🚀");
