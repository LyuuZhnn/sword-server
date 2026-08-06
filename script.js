// ===== LOGIN SESSION =====
const username = localStorage.getItem("tnos_username");
const kelas = localStorage.getItem("tnos_kelas");
const role = localStorage.getItem("tnos_role");

if (!username) {
    window.location.href = "login.html";
}

// ===== LOADING =====
window.onload = () => {

    const loading = document.querySelector(".loading");

    setTimeout(() => {
        loading.style.display = "none";
    }, 1500);

    document.getElementById("welcomeName").innerHTML = username;
    document.getElementById("welcomeClass").innerHTML = kelas;
    document.getElementById("welcomeRole").innerHTML =
        role === "admin" ? "🛡️ ADMIN" : "👤 USER";

};

// ===== JAM =====
function updateClock(){

    document.getElementById("clock").innerHTML =
    new Date().toLocaleTimeString("id-ID");

}

setInterval(updateClock,1000);
updateClock();

// ===== RANDOM STATUS =====
function rand(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

setInterval(()=>{

document.getElementById("cpu").innerHTML=rand(20,80)+" %";
document.getElementById("ram").innerHTML=rand(35,90)+" %";
document.getElementById("ping").innerHTML=rand(2,20)+" ms";

const server=document.getElementById("server-status");

if(Math.random()>0.15){

server.innerHTML="🟢 ONLINE";
server.style.color="#00ff66";

}else{

server.innerHTML="🟡 BUSY";
server.style.color="orange";

}

},2000);

// ===== TERMINAL =====
const input=document.getElementById("terminal-input");
const output=document.querySelector(".output");

input.addEventListener("keydown",function(e){

if(e.key==="Enter"){

const cmd=input.value.trim().toLowerCase();

output.innerHTML+="<br>TNOS@linux:~$ "+cmd;

switch(cmd){

case "help":

output.innerHTML+=`
<br>
help
<br>date
<br>clear
<br>whoami
<br>ping
<br>neofetch
`;

break;

case "date":

output.innerHTML+="<br>"+new Date();

break;

case "whoami":

output.innerHTML+="<br>"+username;

break;

case "ping":

output.innerHTML+="<br>PING google.com...";
setTimeout(()=>{
output.innerHTML+="<br>Reply time=8ms";
},500);

break;

case "neofetch":

output.innerHTML+=`
<br>
TNOS V8 Ultimate
<br>User : ${username}
<br>Role : ${role}
<br>Status : Online
`;

break;

case "clear":

output.innerHTML="TNOS@linux:~$";

break;

default:

output.innerHTML+="<br>Command not found";

}

output.scrollTop=output.scrollHeight;

input.value="";

}

});

// ===== LOGOUT =====
function logout(){

localStorage.removeItem("tnos_username");
localStorage.removeItem("tnos_kelas");
localStorage.removeItem("tnos_role");

window.location.href="login.html";

}

// ===== SUBNET =====

function hitungSubnet(){

const ip=document.getElementById("ip").value.trim();
const prefix=parseInt(document.getElementById("cidr").value);

if(!ip || isNaN(prefix) || prefix<1 || prefix>32){

document.getElementById("hasilSubnet").innerHTML="❌ Input tidak valid";
return;

}

const part=ip.split(".").map(Number);

if(part.length!==4 || part.some(x=>isNaN(x)||x<0||x>255)){

document.getElementById("hasilSubnet").innerHTML="❌ IP Address salah";
return;

}

const ipNum=((part[0]<<24)>>>0)+((part[1]<<16)>>>0)+((part[2]<<8)>>>0)+part[3];

const mask=(0xffffffff<<(32-prefix))>>>0;

const network=(ipNum & mask)>>>0;

const broadcast=(network | (~mask>>>0))>>>0;

function toIP(n){

return[
(n>>>24)&255,
(n>>>16)&255,
(n>>>8)&255,
n&255
].join(".");

}

const subnetMask=toIP(mask);

const wildcard=toIP((~mask)>>>0);

const firstHost=prefix==32?toIP(network):toIP(network+1);

const lastHost=prefix>=31?toIP(broadcast):toIP(broadcast-1);

const totalHost=Math.pow(2,32-prefix);

const usable=prefix>=31?0:totalHost-2;

let kelas="";

if(part[0]<=126) kelas="A";
else if(part[0]<=191) kelas="B";
else if(part[0]<=223) kelas="C";
else if(part[0]<=239) kelas="D";
else kelas="E";

let jenis="Public";

if(
part[0]==10 ||
(part[0]==172 && part[1]>=16 && part[1]<=31) ||
(part[0]==192 && part[1]==168)
){
jenis="Private";
}

document.getElementById("hasilSubnet").innerHTML=`

<b>IP Address</b> : ${ip}<br>
<b>Prefix</b> : /${prefix}<br>
<b>Subnet Mask</b> : ${subnetMask}<br>
<b>Wildcard</b> : ${wildcard}<br>
<hr>

<b>Network</b> : ${toIP(network)}<br>
<b>Broadcast</b> : ${toIP(broadcast)}<br>
<b>First Host</b> : ${firstHost}<br>
<b>Last Host</b> : ${lastHost}<br>

<hr>

<b>Total Address</b> : ${totalHost}<br>
<b>Usable Host</b> : ${usable}<br>

<hr>

<b>IP Class</b> : ${kelas}<br>
<b>Type</b> : ${jenis}

`;

}

// ===== PASSWORD =====

function generatePassword(){

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";

let pass="";

for(let i=0;i<12;i++){

pass+=chars[Math.floor(Math.random()*chars.length)];

}

document.getElementById("passwordResult").innerHTML=pass;

}

// ===== BINARY =====

function convertBinary(){

const angka=document.getElementById("binaryInput").value;

if(angka==="") return;

document.getElementById("binaryResult").innerHTML=

Number(angka).toString(2);

}

// ===== PORT =====

function cekPort(){

const port=document.getElementById("portInput").value;

let hasil="";

if(port==80){

hasil="🟢 HTTP";

}else if(port==443){

hasil="🟢 HTTPS";

}else if(port==22){

hasil="🟢 SSH";

}else{

hasil="⚪ Unknown";

}

document.getElementById("portResult").innerHTML=hasil;

}

// ===== LIVE CHART =====

const canvas = document.getElementById("liveChart");

if(canvas){

const ctx = canvas.getContext("2d");

const labels = [];
const cpuData = [];
const ramData = [];
const pingData = [];

const chart = new Chart(ctx,{

type:"line",

data:{

labels:labels,

datasets:[

{

label:"CPU",

data:cpuData,

borderColor:"#00ffff",

tension:.3

},

{

label:"RAM",

data:ramData,

borderColor:"#00ff66",

tension:.3

},

{

label:"PING",

data:pingData,

borderColor:"#ffcc00",

tension:.3

}

]

},

options:{

responsive:true,

animation:false,

plugins:{

legend:{

labels:{

color:"white"

}

}

},

scales:{

x:{

ticks:{

color:"white"

}

},

y:{

beginAtZero:true,

max:100,

ticks:{

color:"white"

}

}

}

}

});

setInterval(()=>{

if(labels.length>=15){

labels.shift();

cpuData.shift();

ramData.shift();

pingData.shift();

}

labels.push(new Date().toLocaleTimeString());

cpuData.push(rand(20,80));

ramData.push(rand(30,90));

pingData.push(rand(2,20));

chart.update();

},2000);

}

// ===== THEME =====

function toggleTheme(){

document.body.classList.toggle("light");

}

// ===== SYSTEM INFO =====

function showInfo(){

document.getElementById("systemInfo").innerHTML=`

<b>TNOS V8 Ultimate</b><br>

Developer :
MUSYAFFA HANIF SUNNI<br>

Kelas :
XI TJKT 2<br>

Status :
🟢 ONLINE<br>

Version :
8.0 Ultimate

`;

}

// ===== IP CLASS CHECKER =====

function cekIPClass(){

const ip=document.getElementById("ipClassInput").value.trim();

const part=ip.split(".");

if(part.length!==4){

document.getElementById("ipClassResult").innerHTML="❌ IP tidak valid";

return;

}

const a=parseInt(part[0]);

let kelas="";

if(a>=1 && a<=126){

kelas="A";

}else if(a>=128 && a<=191){

kelas="B";

}else if(a>=192 && a<=223){

kelas="C";

}else if(a>=224 && a<=239){

kelas="D";

}else{

kelas="E";

}

let jenis="Public";

if(
a==10 ||
(a==172 && parseInt(part[1])>=16 && parseInt(part[1])<=31) ||
(a==192 && parseInt(part[1])==168)
){

jenis="Private";

}

document.getElementById("ipClassResult").innerHTML=

`
Class : ${kelas}<br>
Type : ${jenis}
`;

}
