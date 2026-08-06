// ===============================
// TNOS V10 ULTIMATE
// PART 1
// ===============================

// ===== LOGIN =====

const username = localStorage.getItem("tnos_username");
const kelas = localStorage.getItem("tnos_kelas");
const role = localStorage.getItem("tnos_role");

if(!username){
location.href="login.html";
}

// ===== LOADING =====

window.onload=function(){

const load=document.querySelector(".loading");

if(load){

setTimeout(()=>{

load.style.display="none";

},1500);

}

const n=document.getElementById("welcomeName");
const c=document.getElementById("welcomeClass");
const r=document.getElementById("welcomeRole");

if(n) n.innerHTML=username;
if(c) c.innerHTML=kelas;

if(r){

r.innerHTML=(role=="admin")?
"🛡️ ADMIN":
"👤 USER";

}

};

// ===== CLOCK =====

function updateClock(){

const clock=document.getElementById("clock");

if(clock){

clock.innerHTML=
new Date().toLocaleTimeString("id-ID");

}

}

setInterval(updateClock,1000);

updateClock();

// ===== RANDOM =====

function rand(min,max){

return Math.floor(Math.random()*(max-min+1))+min;

}

// ===== LIVE STATUS =====

setInterval(()=>{

const cpu=document.getElementById("cpu");
const ram=document.getElementById("ram");
const ping=document.getElementById("ping");
const server=document.getElementById("server-status");

if(cpu) cpu.innerHTML=rand(20,80)+" %";

if(ram) ram.innerHTML=rand(30,90)+" %";

if(ping) ping.innerHTML=rand(2,20)+" ms";

if(server){

if(Math.random()>0.1){

server.innerHTML="🟢 ONLINE";
server.style.color="#00ff66";

}else{

server.innerHTML="🟡 BUSY";
server.style.color="orange";

}

}

},2000);

// ===== LOGOUT =====

function logout(){

localStorage.clear();

location.href="login.html";

}

// ===============================
// TNOS V10 ULTIMATE
// PART 2
// ===============================

// ===== TERMINAL =====

const terminalInput=document.getElementById("terminal-input");
const terminalOutput=document.querySelector(".output");

if(terminalInput){

terminalInput.addEventListener("keydown",function(e){

if(e.key==="Enter"){

const cmd=terminalInput.value.trim().toLowerCase();

terminalOutput.innerHTML+="<br>TNOS@linux:~$ "+cmd;

switch(cmd){

case "help":

terminalOutput.innerHTML+=`
<br><br>
help
<br>clear
<br>date
<br>whoami
<br>ping
<br>ifconfig
<br>ipconfig
<br>hostname
<br>neofetch
`;

break;

case "clear":

terminalOutput.innerHTML="TNOS@linux:~$";

break;

case "date":

terminalOutput.innerHTML+="<br>"+new Date();

break;

case "whoami":

terminalOutput.innerHTML+="<br>"+username;

break;

case "hostname":

terminalOutput.innerHTML+="<br>TNOS-SERVER";

break;

case "ifconfig":

case "ipconfig":

terminalOutput.innerHTML+=`
<br>
eth0
<br>inet : 192.168.1.10
<br>mask : 255.255.255.0
<br>gateway : 192.168.1.1
`;

break;

case "ping":

terminalOutput.innerHTML+="<br>PING google.com";

setTimeout(()=>{

terminalOutput.innerHTML+="<br>Reply : time="+rand(2,20)+" ms";

},500);

break;

case "neofetch":

terminalOutput.innerHTML+=`
<br>
=========================
<br>TNOS V10 Ultimate
<br>User : ${username}
<br>Role : ${role}
<br>Kernel : Linux 6.x
<br>CPU : Intel Xeon
<br>RAM : 16 GB
<br>Status : Online
`;

break;

default:

terminalOutput.innerHTML+="<br>Command not found.";

}

terminalOutput.scrollTop=terminalOutput.scrollHeight;

terminalInput.value="";

}

});

}

// ===== LIVE CHART =====

const chartCanvas=document.getElementById("liveChart");

if(chartCanvas){

const ctx=chartCanvas.getContext("2d");

const labels=[];
const cpuData=[];
const ramData=[];
const pingData=[];

const liveChart=new Chart(ctx,{

type:"line",

data:{

labels:labels,

datasets:[

{

label:"CPU",

data:cpuData,

borderColor:"#00ffff",

tension:0.3

},

{

label:"RAM",

data:ramData,

borderColor:"#00ff66",

tension:0.3

},

{

label:"PING",

data:pingData,

borderColor:"#ffcc00",

tension:0.3

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

liveChart.update();

},2000);

}

// ===============================
// TNOS V10 ULTIMATE
// PART 3
// ===============================

// ===== SUBNET CALCULATOR PRO =====

function hitungSubnet(){

const ip=document.getElementById("ip").value.trim();
const prefix=parseInt(document.getElementById("cidr").value);

const hasil=document.getElementById("hasilSubnet");

if(!ip || isNaN(prefix) || prefix<1 || prefix>32){

hasil.innerHTML="❌ Input tidak valid";
return;

}

const p=ip.split(".").map(Number);

if(p.length!==4 || p.some(n=>isNaN(n)||n<0||n>255)){

hasil.innerHTML="❌ Format IP salah";
return;

}

const ipNum=((p[0]<<24)>>>0)+((p[1]<<16)>>>0)+((p[2]<<8)>>>0)+p[3];

const mask=(0xffffffff<<(32-prefix))>>>0;

const network=(ipNum & mask)>>>0;

const broadcast=(network | (~mask>>>0))>>>0;

function toIP(num){

return[
(num>>>24)&255,
(num>>>16)&255,
(num>>>8)&255,
num&255
].join(".");

}

const first=(prefix>=31)?network:network+1;
const last=(prefix>=31)?broadcast:broadcast-1;

const total=Math.pow(2,32-prefix);

const usable=(prefix>=31)?0:total-2;

let kelas="";

if(p[0]>=1&&p[0]<=126) kelas="A";
else if(p[0]>=128&&p[0]<=191) kelas="B";
else if(p[0]>=192&&p[0]<=223) kelas="C";
else if(p[0]>=224&&p[0]<=239) kelas="D";
else kelas="E";

let type="Public";

if(
p[0]==10 ||
(p[0]==172 && p[1]>=16 && p[1]<=31) ||
(p[0]==192 && p[1]==168)
){

type="Private";

}

const wildcard=(~mask)>>>0;

hasil.innerHTML=`

<b>📍 IP Address :</b> ${ip}<br>
<b>📌 Prefix :</b> /${prefix}<br>
<b>🎭 Subnet Mask :</b> ${toIP(mask)}<br>
<b>🃏 Wildcard :</b> ${toIP(wildcard)}<hr>

<b>🌐 Network :</b> ${toIP(network)}<br>
<b>📡 Broadcast :</b> ${toIP(broadcast)}<br>
<b>✅ First Host :</b> ${toIP(first)}<br>
<b>🚀 Last Host :</b> ${toIP(last)}<hr>

<b>👥 Total Address :</b> ${total}<br>
<b>💻 Usable Host :</b> ${usable}<hr>

<b>🏷️ Class :</b> ${kelas}<br>
<b>🌍 Type :</b> ${type}

`;

}

// ===== IP CLASS CHECKER =====

function cekIPClass(){

const ip=document.getElementById("ipClassInput").value.trim();

const hasil=document.getElementById("ipClassResult");

const p=ip.split(".");

if(p.length!==4){

hasil.innerHTML="❌ IP tidak valid";
return;

}

const a=parseInt(p[0]);

let kelas="";

if(a>=1&&a<=126) kelas="A";
else if(a>=128&&a<=191) kelas="B";
else if(a>=192&&a<=223) kelas="C";
else if(a>=224&&a<=239) kelas="D";
else kelas="E";

let type="Public";

if(
a==10 ||
(a==172 && parseInt(p[1])>=16 && parseInt(p[1])<=31) ||
(a==192 && parseInt(p[1])==168)
){

type="Private";

}

hasil.innerHTML=`
Class : ${kelas}<br>
Type : ${type}
`;

}

// ===== CIDR CONVERTER =====

function convertCIDR(){

const cidr=parseInt(

document.getElementById("cidrInput")
.value.replace("/","")

);

const hasil=document.getElementById("cidrResult");

if(isNaN(cidr)||cidr<1||cidr>32){

hasil.innerHTML="❌ CIDR salah";
return;

}

const mask=(0xffffffff<<(32-cidr))>>>0;

hasil.innerHTML=

[
(mask>>>24)&255,
(mask>>>16)&255,
(mask>>>8)&255,
mask&255

].join(".");

}

// ===============================
// TNOS V10 ULTIMATE
// PART 4
// ===============================

// ===== PASSWORD GENERATOR =====

function generatePassword(){

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

let pass="";

for(let i=0;i<12;i++){

pass+=chars[Math.floor(Math.random()*chars.length)];

}

document.getElementById("passwordResult").innerHTML=pass;

}

// ===== BINARY CONVERTER =====

function convertBinary(){

const input=document.getElementById("binaryInput").value.trim();

const hasil=document.getElementById("binaryResult");

if(input===""){

hasil.innerHTML="Masukkan angka.";
return;

}

const num=parseInt(input);

if(isNaN(num)){

hasil.innerHTML="❌ Angka tidak valid";
return;

}

hasil.innerHTML=`
Decimal : ${num}<br>
Binary : ${num.toString(2)}<br>
Hex : ${num.toString(16).toUpperCase()}
`;

}

// ===== PORT CHECKER =====

function cekPort(){

const port=parseInt(document.getElementById("portInput").value);

const hasil=document.getElementById("portResult");

const ports={

20:"FTP Data",
21:"FTP",
22:"SSH",
23:"Telnet",
25:"SMTP",
53:"DNS",
67:"DHCP Server",
68:"DHCP Client",
69:"TFTP",
80:"HTTP",
110:"POP3",
123:"NTP",
143:"IMAP",
161:"SNMP",
389:"LDAP",
443:"HTTPS",
445:"SMB",
587:"SMTP TLS",
993:"IMAPS",
995:"POP3S",
1433:"Microsoft SQL",
3306:"MySQL",
3389:"Remote Desktop",
5432:"PostgreSQL",
5900:"VNC",
8080:"HTTP Alternate"

};

hasil.innerHTML=ports[port]
? "🟢 "+ports[port]
: "⚪ Unknown Port";

}

// ===== PING SIMULATOR =====

function pingHost(){

const host=document.getElementById("pingHost").value.trim();

const hasil=document.getElementById("pingResult");

if(host===""){

hasil.innerHTML="Masukkan host.";
return;

}

let ms=rand(2,20);

hasil.innerHTML=`
PING ${host}<br>
Reply from ${host}<br>
Time = ${ms} ms<br>
TTL = 64
`;

}

// ===== DNS LOOKUP =====

function dnsLookup(){

const domain=document.getElementById("dnsInput").value.trim();

const hasil=document.getElementById("dnsResult");

if(domain===""){

hasil.innerHTML="Masukkan domain.";
return;

}

const ip=`142.${rand(1,254)}.${rand(1,254)}.${rand(1,254)}`;

hasil.innerHTML=`
Domain : ${domain}<br>
IPv4 : ${ip}
`;

}

// ===== NETWORK SCANNER =====

function scanNetwork(){

const hasil=document.getElementById("scanResult");

hasil.innerHTML=`
🔍 Scanning network...<br><br>
🟢 192.168.1.1 (Gateway)<br>
🟢 192.168.1.10 (TNOS Server)<br>
🟢 192.168.1.15 (Laptop)<br>
🟢 192.168.1.20 (Printer)<br>
🟢 192.168.1.30 (Android)<br><br>

✅ Scan selesai.
`;

}
