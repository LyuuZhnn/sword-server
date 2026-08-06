// ===============================
// TNOS V8 ULTIMATE
// SCRIPT PART 1
// ===============================

// LOGIN

const username=localStorage.getItem("tnos_username")||"Guest";
const kelas=localStorage.getItem("tnos_kelas")||"-";
const role=localStorage.getItem("tnos_role")||"user";

// WELCOME

const nama=document.getElementById("welcomeName");
const cls=document.getElementById("welcomeClass");
const rl=document.getElementById("welcomeRole");

if(nama) nama.innerHTML=username;
if(cls) cls.innerHTML=kelas;
if(rl) rl.innerHTML=(role=="admin")?"🛡️ ADMIN":"👤 USER";

// CLOCK

function clock(){

const c=document.getElementById("clock");

if(c){

c.innerHTML=new Date().toLocaleTimeString("id-ID");

}

}

setInterval(clock,1000);

clock();

// RANDOM

function rand(min,max){

return Math.floor(Math.random()*(max-min+1))+min;

}

// DASHBOARD

let second=0;

setInterval(()=>{

const cpu=document.getElementById("cpu");
const ram=document.getElementById("ram");
const ping=document.getElementById("ping");
const online=document.getElementById("onlineUser");
const up=document.getElementById("uptime");

if(cpu) cpu.innerHTML=rand(20,80)+"%";
if(ram) ram.innerHTML=rand(30,90)+"%";
if(ping) ping.innerHTML=rand(1,20)+" ms";
if(online) online.innerHTML=rand(1,15);

second++;

const h=Math.floor(second/3600);
const m=Math.floor((second%3600)/60);
const s=second%60;

if(up){

up.innerHTML=

String(h).padStart(2,"0")+":"+

String(m).padStart(2,"0")+":"+

String(s).padStart(2,"0");

}

},1000);

// LIVE CHART

const liveCanvas=document.getElementById("liveChart");

if(liveCanvas){

const ctx=liveCanvas.getContext("2d");

const labels=[];

const cpuData=[];

const ramData=[];

new Chart(ctx,{

type:"line",

data:{

labels,

datasets:[

{

label:"CPU",

data:cpuData,

borderColor:"#00e5ff",

tension:.4

},

{

label:"RAM",

data:ramData,

borderColor:"#00ff66",

tension:.4

}

]

},

options:{

responsive:true,

animation:false

}

});

setInterval(()=>{

if(labels.length>12){

labels.shift();

cpuData.shift();

ramData.shift();

}

labels.push("");

cpuData.push(rand(20,80));

ramData.push(rand(30,90));

Chart.getChart(ctx).update();

},1000);

}

// ===============================
// TNOS V8 ULTIMATE
// SCRIPT PART 2
// ===============================

// TRAFFIC CHART

const trafficCanvas=document.getElementById("trafficChart");

if(trafficCanvas){

const ctx2=trafficCanvas.getContext("2d");

const labels2=[];
const uploadData=[];
const downloadData=[];

new Chart(ctx2,{
type:"line",
data:{
labels: labels2,
datasets:[
{
label:"Upload",
data:uploadData,
borderColor:"#00e5ff",
tension:.4
},
{
label:"Download",
data:downloadData,
borderColor:"#ff00ff",
tension:.4
}
]
},
options:{
responsive:true,
animation:false
}
});

setInterval(()=>{

if(labels2.length>12){

labels2.shift();
uploadData.shift();
downloadData.shift();

}

labels2.push("");

uploadData.push(rand(10,90));
downloadData.push(rand(20,100));

Chart.getChart(ctx2).update();

},1000);

}

// TERMINAL

const terminal=document.getElementById("terminal");
const terminalInput=document.getElementById("terminal-input");

function print(text){

if(!terminal) return;

terminal.innerHTML+=text+"<br>";

terminal.scrollTop=terminal.scrollHeight;

}

if(terminalInput){

terminalInput.addEventListener("keydown",e=>{

if(e.key!="Enter") return;

const cmd=terminalInput.value.trim();

print("> "+cmd);

switch(cmd){

case "help":

print("help");
print("clear");
print("date");
print("whoami");
print("uptime");

break;

case "clear":

terminal.innerHTML="";

break;

case "date":

print(new Date());

break;

case "whoami":

print(username);

break;

case "uptime":

print(document.getElementById("uptime").innerHTML);

break;

default:

print("Command not found");

}

terminalInput.value="";

});

}

// LOGOUT

function logout(){

localStorage.removeItem("tnos_username");
localStorage.removeItem("tnos_kelas");
localStorage.removeItem("tnos_role");

location.href="login.html";

}

// ===============================
// TNOS V8 ULTIMATE
// SCRIPT PART 3
// NETWORK TOOLS
// ===============================

// SUBNET CALCULATOR

function calculateSubnet(){

const ip=document.getElementById("ipInput").value.trim();
const prefix=parseInt(document.getElementById("prefixInput").value);

const hasil=document.getElementById("subnetResult");

if(!ip||isNaN(prefix)){

hasil.innerHTML="Input tidak valid";

return;

}

hasil.innerHTML=

"IP : "+ip+

"<br>Prefix : /"+prefix+

"<br>Host : "+(Math.pow(2,32-prefix)-2);

}

// IP CLASS

function checkIPClass(){

const ip=document.getElementById("classInput").value.trim();

const first=parseInt(ip.split(".")[0]);

let cls="Unknown";

if(first>=1&&first<=126) cls="Class A";
else if(first<=191) cls="Class B";
else if(first<=223) cls="Class C";
else if(first<=239) cls="Class D";
else if(first<=255) cls="Class E";

document.getElementById("classResult").innerHTML=cls;

}

// CIDR

function convertCIDR(){

const mask=document.getElementById("cidrInput").value.trim();

const hasil=document.getElementById("cidrResult");

const maps={

"255.0.0.0":8,
"255.255.0.0":16,
"255.255.255.0":24,
"255.255.255.128":25,
"255.255.255.192":26,
"255.255.255.224":27,
"255.255.255.240":28,
"255.255.255.248":29,
"255.255.255.252":30

};

hasil.innerHTML=maps[mask]?
"/"+maps[mask]:
"Mask tidak dikenal";

}

// BINARY

function convertBinary(){

const value=document.getElementById("binaryInput").value.trim();

const hasil=document.getElementById("binaryResult");

if(isNaN(value)){

hasil.innerHTML="Masukkan angka";

return;

}

hasil.innerHTML=Number(value).toString(2);

}

// PASSWORD

function generatePassword(){

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

let pass="";

for(let i=0;i<16;i++){

pass+=chars.charAt(Math.floor(Math.random()*chars.length));

}

document.getElementById("passwordResult").innerHTML=pass;

}

// PORT

function checkPort(){

const port=parseInt(document.getElementById("portInput").value);

const hasil=document.getElementById("portResult");

if(isNaN(port)){

hasil.innerHTML="Port tidak valid";

return;

}

hasil.innerHTML=(port<=1024)?
"Well Known Port":
"Dynamic Port";

}

// PING

function pingHost(){

const host=document.getElementById("pingHost").value.trim();

document.getElementById("pingResult").innerHTML=

host+" : "+rand(2,20)+" ms";

}

// DNS

function dnsLookup(){

const domain=document.getElementById("dnsInput").value.trim();

document.getElementById("dnsResult").innerHTML=

domain+" → 8.8.8."+rand(1,254);

}

// NETWORK SCAN

function scanNetwork(){

const hasil=document.getElementById("scanResult");

hasil.innerHTML="";

for(let i=1;i<=10;i++){

hasil.innerHTML+=

"192.168.1."+i+

" ✅ Online<br>";

}

}

// ===============================
// TNOS V8 ULTIMATE
// SCRIPT PART 4
// ===============================

// SERVER STATUS

setInterval(()=>{

const status=document.getElementById("serverStatus");

if(!status) return;

if(Math.random()>0.1){

status.innerHTML="🟢 ONLINE";
status.style.color="#00ff66";

}else{

status.innerHTML="🔴 OFFLINE";
status.style.color="#ff4444";

}

},5000);

// UPLOAD & DOWNLOAD (opsional jika ada elemennya)

setInterval(()=>{

const up=document.getElementById("uploadSpeed");
const down=document.getElementById("downloadSpeed");

if(up){

up.innerHTML=rand(20,100)+" Mbps";

}

if(down){

down.innerHTML=rand(50,300)+" Mbps";

}

},1000);

// CARD ANIMATION

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-8px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});

// SIDEBAR ACTIVE

document.querySelectorAll(".sidebar a").forEach(link=>{

link.addEventListener("click",()=>{

document.querySelectorAll(".sidebar a").forEach(a=>{

a.classList.remove("active");

});

link.classList.add("active");

});

});

// SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.onclick=function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

};

});

// AUTO SCROLL TERMINAL

if(terminal){

setInterval(()=>{

terminal.scrollTop=terminal.scrollHeight;

},500);

}

// STARTUP MESSAGE

window.addEventListener("load",()=>{

if(terminal){

print("=================================");
print(" TNOS V8 ULTIMATE");
print(" System Online");
print(" Ketik 'help' untuk bantuan");
print("=================================");

}

console.log("TNOS V8 Ultimate Loaded");

});

// ===============================
// TNOS V8 ULTIMATE
// SCRIPT PART 5
// EXTRA FEATURES
// ===============================

// SERVER LOAD

const serverBar=document.getElementById("serverBar");

setInterval(()=>{

if(serverBar){

const load=rand(20,95);

serverBar.style.width=load+"%";

serverBar.innerHTML=load+"%";

}

},1000);

// NETWORK SPEED

setInterval(()=>{

const up=document.getElementById("uploadSpeed");
const down=document.getElementById("downloadSpeed");

if(up){

up.innerHTML=rand(10,120)+" Mbps";

}

if(down){

down.innerHTML=rand(20,300)+" Mbps";

}

},1200);

// LIVE STATUS

setInterval(()=>{

const status=document.getElementById("serverStatus");

if(!status) return;

const list=[

"🟢 ONLINE",
"🟢 ONLINE",
"🟢 ONLINE",
"🟢 ONLINE",
"🟡 HIGH LOAD",
"🔴 MAINTENANCE"

];

status.innerHTML=list[rand(0,list.length-1)];

},4000);

// CPU COLOR

setInterval(()=>{

const cpu=document.getElementById("cpu");

if(!cpu) return;

const value=parseInt(cpu.innerHTML);

if(value<50){

cpu.style.color="#00ff66";

}else if(value<80){

cpu.style.color="#ffcc00";

}else{

cpu.style.color="#ff4444";

}

},1000);

// RAM COLOR

setInterval(()=>{

const ram=document.getElementById("ram");

if(!ram) return;

const value=parseInt(ram.innerHTML);

if(value<60){

ram.style.color="#00ff66";

}else if(value<85){

ram.style.color="#ffcc00";

}else{

ram.style.color="#ff4444";

}

},1000);

// PING COLOR

setInterval(()=>{

const ping=document.getElementById("ping");

if(!ping) return;

const value=parseInt(ping.innerHTML);

if(value<10){

ping.style.color="#00ff66";

}else if(value<30){

ping.style.color="#ffcc00";

}else{

ping.style.color="#ff4444";

}

},1000);

// ONLINE USERS

setInterval(()=>{

const online=document.getElementById("onlineUser");

if(online){

online.innerHTML=rand(1,50);

}

},5000);

console.log("TNOS V8 EXTRA LOADED");


// ===============================
// TNOS V8 ULTIMATE
// SCRIPT PART 6
// SETTINGS & EXTRA
// ===============================

// THEME

const body=document.body;

function toggleTheme(){

body.classList.toggle("light");

localStorage.setItem(

"tnos_theme",

body.classList.contains("light")?

"light":"dark"

);

}

if(localStorage.getItem("tnos_theme")=="light"){

body.classList.add("light");

}

// NOTIFICATION

function notify(text){

const n=document.createElement("div");

n.className="notify";

n.innerHTML=text;

document.body.appendChild(n);

setTimeout(()=>{

n.classList.add("show");

},100);

setTimeout(()=>{

n.remove();

},3000);

}

// START

window.addEventListener("load",()=>{

notify("✅ TNOS V8 Ultimate Ready");

});

// COPY RESULT

function copyResult(id){

const el=document.getElementById(id);

if(!el) return;

navigator.clipboard.writeText(el.innerText);

notify("📋 Berhasil disalin");

}

// EXPORT REPORT

function exportReport(){

let txt="TNOS REPORT\n\n";

txt+="CPU : "+document.getElementById("cpu").innerText+"\n";

txt+="RAM : "+document.getElementById("ram").innerText+"\n";

txt+="PING : "+document.getElementById("ping").innerText+"\n";

txt+="ONLINE : "+document.getElementById("onlineUser").innerText+"\n";

txt+="UPTIME : "+document.getElementById("uptime").innerText+"\n";

const blob=new Blob([txt],{

type:"text/plain"

});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="tnos-report.txt";

a.click();

notify("📄 Report berhasil dibuat");

}

// RANDOM MOTD

const motd=[

"🚀 Welcome to TNOS",

"🛡 Network Protected",

"⚡ Monitoring Active",

"🌐 Server Running",

"💻 System Online"

];

setInterval(()=>{

const title=document.querySelector("#dashboard h1");

if(title){

title.innerHTML=motd[rand(0,motd.length-1)];

}

},8000);

// FPS COUNTER

let fps=0;

setInterval(()=>{

fps=rand(58,60);

console.log("FPS:",fps);

},1000);

// MEMORY

setInterval(()=>{

console.log(

"CPU",

document.getElementById("cpu")?.innerText,

"RAM",

document.getElementById("ram")?.innerText

);

},10000);

console.log("TNOS V8 ULTIMATE READY");

// ===============================
// TNOS V8 ULTIMATE
// SCRIPT PART 7 (FINAL)
// ===============================

// KEYBOARD SHORTCUTS

document.addEventListener("keydown",e=>{

if(e.ctrlKey&&e.key==="l"){

e.preventDefault();

const t=document.getElementById("terminal");

if(t) t.innerHTML="";

notify("🧹 Terminal dibersihkan");

}

if(e.ctrlKey&&e.key==="e"){

e.preventDefault();

exportReport();

}

if(e.ctrlKey&&e.key==="d"){

e.preventDefault();

toggleTheme();

}

});

// CLOCK DATE

function updateDate(){

const el=document.getElementById("today");

if(!el) return;

el.innerHTML=new Date().toLocaleDateString("id-ID",{

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

});

}

updateDate();

// SYSTEM INFO

setInterval(()=>{

const cpu=document.getElementById("cpu");
const ram=document.getElementById("ram");
const ping=document.getElementById("ping");

document.title=

`CPU ${cpu?cpu.innerText:"0%"} | `+

`RAM ${ram?ram.innerText:"0%"} | `+

`PING ${ping?ping.innerText:"0ms"}`;

},1000);

// RANDOM LOG

const logs=[

"Firewall Active",
"Port Scan Blocked",
"Connection Stable",
"Latency Normal",
"Traffic Balanced",
"CPU Optimized",
"RAM Stable",
"Security Enabled"

];

if(terminal){

setInterval(()=>{

print("[LOG] "+logs[rand(0,logs.length-1)]);

if(terminal.children.length>80){

terminal.innerHTML="";

print("Terminal dibersihkan otomatis");

}

},5000);

}

// FADE IN

window.addEventListener("load",()=>{

document.querySelectorAll(".card").forEach((card,i)=>{

card.style.opacity="0";
card.style.transform="translateY(20px)";

setTimeout(()=>{

card.style.transition=".5s";
card.style.opacity="1";
card.style.transform="translateY(0)";

},i*120);

});

});

// ONLINE TIME

let onlineMinute=0;

setInterval(()=>{

onlineMinute++;

if(onlineMinute%30===0){

notify("🟢 Sistem berjalan "+onlineMinute+" menit");

}

},60000);

// AUTO SAVE

setInterval(()=>{

localStorage.setItem("tnos_last_open",new Date());

},5000);

// WELCOME

console.log("%cTNOS V8 ULTIMATE","color:#00e5ff;font-size:24px;font-weight:bold;");
console.log("Developed by MUSYAFFA HANIF SUNNI");
console.log("System Ready ✅");
