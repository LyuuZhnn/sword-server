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

function hitungSubnet(){

let ip=document.getElementById("ip").value.trim();
let cidr=parseInt(document.getElementById("cidr").value);

let hasil=document.getElementById("hasilSubnet");

if(!ip || isNaN(cidr)){
hasil.innerHTML="Masukkan IP dan CIDR!";
return;
}

let p=ip.split(".").map(Number);

if(p.length!==4 || p.some(n=>isNaN(n)||n<0||n>255) || cidr<1 || cidr>32){
hasil.innerHTML="IP atau CIDR tidak valid!";
return;
}

let ipNum=((p[0]<<24)>>>0)+((p[1]<<16)>>>0)+((p[2]<<8)>>>0)+p[3];

let mask=(cidr===0)?0:(0xffffffff<<(32-cidr))>>>0;

let network=ipNum & mask;

let broadcast=(network | (~mask>>>0))>>>0;

function toIP(num){
return[
(num>>>24)&255,
(num>>>16)&255,
(num>>>8)&255,
num&255
].join(".");
}

let first=(cidr==32)?network:network+1;
let last=(cidr==32)?network:broadcast-1;

let total=Math.pow(2,32-cidr);
let usable=(cidr>=31)?0:total-2;

hasil.innerHTML=`
<b>📍 IP Address :</b> ${ip}<br>
<b>🌐 Network :</b> ${toIP(network)}<br>
<b>📡 Broadcast :</b> ${toIP(broadcast)}<br>
<b>✅ First Host :</b> ${toIP(first)}<br>
<b>🚀 Last Host :</b> ${toIP(last)}<br>
<b>🎭 Subnet Mask :</b> ${toIP(mask)}<br>
<b>👥 Total Host :</b> ${total}<br>
<b>💻 Usable Host :</b> ${usable}
`;

}

let octet=ip.split(".");

if(octet.length!=4){
hasil.innerHTML="Format IP salah!";
return;
}

let mask=[];

let sisa=cidr;

for(let i=0;i<4;i++){

if(sisa>=8){
mask.push(255);
sisa-=8;
}else if(sisa>0){
mask.push(256-Math.pow(2,8-sisa));
sisa=0;
}else{
mask.push(0);
}

}

let totalHost=Math.pow(2,32-cidr);

let usable=totalHost-2;

hasil.innerHTML=`
<b>IP Address :</b> ${ip}<br>
<b>CIDR :</b> /${cidr}<br>
<b>Subnet Mask :</b> ${mask.join(".")}<br>
<b>Total Host :</b> ${totalHost}<br>
<b>Host Usable :</b> ${usable}
`;

}
