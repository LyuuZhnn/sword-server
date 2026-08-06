// ===== LOADING =====
window.onload = () => {
    setTimeout(() => {
        const loading = document.querySelector(".loading");
        if (loading) loading.style.display = "none";
    }, 1800);
};

// ===== CLOCK =====
function updateClock() {
    const now = new Date();
    const clock = document.getElementById("clock");
    if (clock) {
        clock.innerHTML = now.toLocaleTimeString("id-ID");
    }
}
setInterval(updateClock,1000);
updateClock();

// ===== RANDOM STATUS =====
function rand(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

setInterval(()=>{

document.getElementById("cpu").innerHTML=rand(10,70)+" %";
document.getElementById("ram").innerHTML=rand(25,80)+" %";
document.getElementById("ping").innerHTML=rand(3,20)+" ms";

const server=document.getElementById("server-status");

if(rand(1,10)<=9){
server.innerHTML="🟢 ONLINE";
server.style.color="#00ff99";
}else{
server.innerHTML="🟡 BUSY";
server.style.color="orange";
}

},2000);

// ===== TERMINAL =====
const input=document.getElementById("terminal-input");
const output=document.querySelector(".output");

if(input && output){

input.addEventListener("keydown",function(e){

if(e.key==="Enter"){

let cmd=input.value.trim().toLowerCase();

output.innerHTML+="<br>TNOS@linux:~$ "+cmd;

switch(cmd){

case "help":
output.innerHTML+=`
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
output.innerHTML+="<br>"+new Date();
break;

case "whoami":
output.innerHTML+="<br>administrator";
break;

case "ping":
output.innerHTML+="<br>Reply from google.com : time="+rand(3,15)+" ms";
break;

case "ifconfig":
output.innerHTML+=`
<br>
eth0
<br>IP : 192.168.1.10
<br>Mask : 255.255.255.0
`;
break;

case "neofetch":
output.innerHTML+=`
<br>
TNOS V6 Ultimate
<br>User : MUSYAFFA HANIF SUNNI
<br>Kelas : XI TJKT 2
<br>Kernel : Linux
`;
break;

default:
output.innerHTML+="<br>Command not found.";

}

output.scrollTop=output.scrollHeight;
input.value="";

}

});

}

// ===== SUBNET CALCULATOR =====
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

let first=(cidr>=31)?network:network+1;
let last=(cidr>=31)?broadcast:broadcast-1;

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

// ===== CIDR CALCULATOR =====

function hitungCIDR(){

let cidr=parseInt(document.getElementById("cidrOnly").value);

let hasil=document.getElementById("hasilCIDR");

if(isNaN(cidr)||cidr<1||cidr>32){

hasil.innerHTML="CIDR tidak valid";

return;

}

let host=Math.pow(2,32-cidr);

let usable=(cidr>=31)?0:host-2;

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

hasil.innerHTML=`
<b>CIDR :</b> /${cidr}<br>
<b>Subnet Mask :</b> ${mask.join(".")}<br>
<b>Total Host :</b> ${host}<br>
<b>Usable Host :</b> ${usable}
`;

}

// ===== IP CLASS =====

function cekIPClass(){

let ip=document.getElementById("ipClass").value.trim();

let hasil=document.getElementById("hasilClass");

let first=parseInt(ip.split(".")[0]);

if(isNaN(first)){

hasil.innerHTML="IP tidak valid";

return;

}

let kelas="";

let jenis="Public";

if(first>=1&&first<=126) kelas="A";
else if(first<=191) kelas="B";
else if(first<=223) kelas="C";
else if(first<=239) kelas="D";
else kelas="E";

if(
first==10||
(first==172&&parseInt(ip.split(".")[1])>=16&&parseInt(ip.split(".")[1])<=31)||
(first==192&&parseInt(ip.split(".")[1])==168)
){
jenis="Private";
}

hasil.innerHTML=`
<b>IP :</b> ${ip}<br>
<b>Class :</b> ${kelas}<br>
<b>Type :</b> ${jenis}
`;

}

// ===== PASSWORD GENERATOR =====

function generatePassword(){

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const len=parseInt(document.getElementById("passLength").value);

let pass="";

for(let i=0;i<len;i++){

pass+=chars.charAt(Math.floor(Math.random()*chars.length));

}

document.getElementById("generatedPassword").value=pass;

}

function copyPassword(){

const input=document.getElementById("generatedPassword");

input.select();

document.execCommand("copy");

alert("Password berhasil disalin!");

}

// ===== BINARY IP CONVERTER =====

function convertBinary(){

let ip=document.getElementById("binaryIP").value.trim();

let hasil=document.getElementById("binaryResult");

let part=ip.split(".");

if(part.length!=4){

hasil.innerHTML="IP tidak valid";

return;

}

let binary=part.map(x=>{

let n=parseInt(x);

if(isNaN(n)||n<0||n>255)return "ERROR";

return n.toString(2).padStart(8,"0");

});

hasil.innerHTML=`
<b>Binary :</b><br>
${binary.join(" . ")}
`;

}

// ===== NETWORK SCANNER =====

function scanNetwork(){

const ip=document.getElementById("scanIP").value.trim();
const hasil=document.getElementById("scanResult");

if(!ip){
hasil.innerHTML="Masukkan IP!";
return;
}

hasil.innerHTML="🔍 Scanning...";

setTimeout(()=>{

hasil.innerHTML=`
🟢 Host : ${ip}<br>
Latency : ${Math.floor(Math.random()*10)+1} ms<br>
Status : ONLINE
`;

},1000);

}

// ===== PORT CHECKER =====

function cekPort(){

const port=document.getElementById("portSelect").value;
const hasil=document.getElementById("portResult");

const status=Math.random()>0.3?"🟢 OPEN":"🔴 CLOSED";

hasil.innerHTML=`
<b>Port :</b> ${port}<br>
<b>Status :</b> ${status}
`;

}
