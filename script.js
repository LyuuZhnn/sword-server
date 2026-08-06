// ===================================
// TNOS V11 ULTIMATE
// SCRIPT PART 1
// ===================================

// ===== LOGIN CHECK =====

const username=localStorage.getItem("tnos_username");
const kelas=localStorage.getItem("tnos_kelas");
const role=localStorage.getItem("tnos_role");

if(!username){

window.location.href="login.html";

}

// ===== WELCOME =====

window.onload=function(){
const loading=document.querySelector(".loading");

if(loading){
    loading.style.display="none";
}

const nama=document.getElementById("welcomeName");
const cls=document.getElementById("welcomeClass");
const rl=document.getElementById("welcomeRole");

if(nama) nama.innerHTML=username;

if(cls) cls.innerHTML=kelas;

if(rl){

if(role=="admin"){

rl.innerHTML="🛡️ ADMIN";

}else{

rl.innerHTML="👤 USER";

}

}

};

// ===== CLOCK =====

function updateClock(){

const clock=document.getElementById("clock");

if(clock){

clock.innerHTML=new Date().toLocaleTimeString("id-ID");

}

}

setInterval(updateClock,1000);

updateClock();

// ===== RANDOM =====

function rand(min,max){

return Math.floor(Math.random()*(max-min+1))+min;

}

// ===== DASHBOARD LIVE =====

setInterval(()=>{

const cpu=document.getElementById("cpu");
const ram=document.getElementById("ram");
const ping=document.getElementById("ping");
const server=document.getElementById("server-status");

if(cpu){

cpu.innerHTML=rand(20,80)+" %";

}

if(ram){

ram.innerHTML=rand(30,90)+" %";

}

if(ping){

ping.innerHTML=rand(2,20)+" ms";

}

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

// ===== UPTIME =====

let startTime=Date.now();

setInterval(()=>{

const s=Math.floor((Date.now()-startTime)/1000);

const h=String(Math.floor(s/3600)).padStart(2,"0");

const m=String(Math.floor((s%3600)/60)).padStart(2,"0");

const sec=String(s%60).padStart(2,"0");

const up=document.getElementById("uptime");

if(up){

up.innerHTML=`${h}:${m}:${sec}`;

}

},1000);

// ===== LOGOUT =====

function logout(){

localStorage.removeItem("tnos_username");
localStorage.removeItem("tnos_kelas");
localStorage.removeItem("tnos_role");

window.location.href="login.html";

}

// ===================================
// TNOS V11 ULTIMATE
// SCRIPT PART 2
// TERMINAL + LIVE CHART
// ===================================

// ===== TERMINAL =====

const terminalInput=document.getElementById("terminal-input");
const terminalOutput=document.querySelector(".output");

if(terminalInput){

terminalInput.addEventListener("keydown",function(e){

if(e.key==="Enter"){

const cmd=terminalInput.value.trim().toLowerCase();

terminalOutput.innerHTML+="<br><span style='color:#00ffff'>TNOS@server:~$</span> "+cmd;

switch(cmd){

case "help":

terminalOutput.innerHTML+=`
<br>
=========================
<br>help
<br>clear
<br>date
<br>whoami
<br>hostname
<br>pwd
<br>ls
<br>ping
<br>ifconfig
<br>ipconfig
<br>netstat
<br>route
<br>neofetch
`;

break;

case "clear":

terminalOutput.innerHTML="";

break;

case "date":

terminalOutput.innerHTML+="<br>"+new Date().toString();

break;

case "whoami":

terminalOutput.innerHTML+="<br>"+username;

break;

case "hostname":

terminalOutput.innerHTML+="<br>TNOS-SERVER";

break;

case "pwd":

terminalOutput.innerHTML+="<br>/home/"+username.replaceAll(" ","").toLowerCase();

break;

case "ls":

terminalOutput.innerHTML+=`
<br>
index.html
<br>login.html
<br>style.css
<br>script.js
<br>auth.js
`;

break;

case "ifconfig":
case "ipconfig":

terminalOutput.innerHTML+=`
<br>
eth0
<br>inet 192.168.1.10
<br>mask 255.255.255.0
<br>gateway 192.168.1.1
`;

break;

case "ping":

terminalOutput.innerHTML+=`
<br>
Reply from google.com
<br>time=${rand(2,20)} ms
`;

break;

case "route":

terminalOutput.innerHTML+=`
<br>
Destination : 0.0.0.0
<br>Gateway : 192.168.1.1
`;

break;

case "netstat":

terminalOutput.innerHTML+=`
<br>
TCP 0.0.0.0:80 LISTEN
<br>TCP 0.0.0.0:443 LISTEN
<br>TCP 0.0.0.0:22 LISTEN
`;

break;

case "neofetch":

terminalOutput.innerHTML+=`
<br>
=========================
<br>TNOS V11 Ultimate
<br>User : ${username}
<br>Kelas : ${kelas}
<br>Role : ${role}
<br>OS : Linux
<br>Kernel : 6.x
<br>RAM : 16 GB
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

tension:.4

},

{

label:"RAM",

data:ramData,

borderColor:"#00ff66",

tension:.4

},

{

label:"PING",

data:pingData,

borderColor:"#ffcc00",

tension:.4

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

if(labels.length>=20){

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

// ===================================
// TNOS V11 ULTIMATE
// SCRIPT PART 3
// DASHBOARD PRO
// ===================================

// ===== ONLINE USER =====

const onlineUser=document.getElementById("onlineUser");

if(onlineUser){

onlineUser.innerHTML=rand(8,35);

setInterval(()=>{

onlineUser.innerHTML=rand(8,35);

},5000);

}

// ===== NETWORK TRAFFIC CHART =====

const trafficCanvas=document.getElementById("trafficChart");

if(trafficCanvas){

const ctx2=trafficCanvas.getContext("2d");

const labels2=[];

const uploadData=[];

const downloadData=[];

const trafficChart=new Chart(ctx2,{

type:"line",

data:{

labels:labels2,

datasets:[

{

label:"Upload",

data:uploadData,

borderColor:"#00ffff",

tension:.4

},

{

label:"Download",

data:downloadData,

borderColor:"#ff00aa",

tension:.4

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

if(labels2.length>=20){

labels2.shift();

uploadData.shift();

downloadData.shift();

}

labels2.push(new Date().toLocaleTimeString());

uploadData.push(rand(5,60));

downloadData.push(rand(10,95));

trafficChart.update();

},2000);

}

// ===== SERVER LOAD =====

const loadBar=document.getElementById("serverLoad");

if(loadBar){

setInterval(()=>{

loadBar.style.width=rand(20,95)+"%";

},2000);

}

// ===== TOAST =====

function toast(text){

const div=document.createElement("div");

div.innerHTML=text;

div.style.position="fixed";
div.style.bottom="20px";
div.style.right="20px";
div.style.background="#00bcd4";
div.style.color="white";
div.style.padding="12px 18px";
div.style.borderRadius="10px";
div.style.zIndex="9999";
div.style.boxShadow="0 0 15px rgba(0,255,255,.4)";

document.body.appendChild(div);

setTimeout(()=>{

div.remove();

},3000);

}

// ===== NOTIFIKASI LOGIN =====

setTimeout(()=>{

toast("✅ Selamat datang "+username);

},1000);

// ===================================
// TNOS V11 ULTIMATE
// SCRIPT PART 4
// NETWORK TOOLS PRO
// ===================================

// ===== IP TO INTEGER =====

function ipToInt(ip){

const p=ip.split(".").map(Number);

return (((p[0]<<24)>>>0)+((p[1]<<16)>>>0)+((p[2]<<8)>>>0)+p[3])>>>0;

}

function intToIP(num){

return[
(num>>>24)&255,
(num>>>16)&255,
(num>>>8)&255,
num&255
].join(".");

}

// ===== SUBNET CALCULATOR PRO =====

function hitungSubnet(){

const ip=document.getElementById("ip").value.trim();

const prefix=parseInt(document.getElementById("cidr").value);

const hasil=document.getElementById("hasilSubnet");

if(!ip || isNaN(prefix) || prefix<1 || prefix>32){

hasil.innerHTML="❌ Input tidak valid";

return;

}

const ipInt=ipToInt(ip);

const mask=(0xffffffff<<(32-prefix))>>>0;

const network=(ipInt & mask)>>>0;

const broadcast=(network | (~mask>>>0))>>>0;

const first=(prefix>=31)?network:network+1;

const last=(prefix>=31)?broadcast:broadcast-1;

const wildcard=(~mask)>>>0;

const total=Math.pow(2,32-prefix);

const usable=(prefix>=31)?0:total-2;

hasil.innerHTML=`

<b>📍 IP Address</b><br>${ip}<hr>

<b>🌐 Network</b><br>${intToIP(network)}<br><br>

<b>📡 Broadcast</b><br>${intToIP(broadcast)}<br><br>

<b>✅ First Host</b><br>${intToIP(first)}<br><br>

<b>🚀 Last Host</b><br>${intToIP(last)}<br><br>

<b>🎭 Subnet Mask</b><br>${intToIP(mask)}<br><br>

<b>🃏 Wildcard</b><br>${intToIP(wildcard)}<br><br>

<b>👥 Total Address</b><br>${total}<br><br>

<b>💻 Usable Host</b><br>${usable}

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

hasil.innerHTML=intToIP(mask);

}

// ===== IP CLASS =====

function cekIPClass(){

const ip=document

.getElementById("ipClassInput")

.value;

const a=parseInt(ip.split(".")[0]);

let kelas="";

if(a<=126){

kelas="A";

}else if(a<=191){

kelas="B";

}else if(a<=223){

kelas="C";

}else if(a<=239){

kelas="D";

}else{

kelas="E";

}

document

.getElementById("ipClassResult")

.innerHTML=

"Class : "+kelas;

}

// ===================================
// TNOS V11 ULTIMATE
// SCRIPT PART 5
// NETWORK UTILITIES
// ===================================

// ===== BINARY CONVERTER =====

function convertBinary(){

const input=document.getElementById("binaryInput").value.trim();

const hasil=document.getElementById("binaryResult");

if(input===""){

hasil.innerHTML="❌ Masukkan angka";

return;

}

const num=parseInt(input);

if(isNaN(num)){

hasil.innerHTML="❌ Input tidak valid";

return;

}

hasil.innerHTML=`
<b>Decimal</b> : ${num}<br>
<b>Binary</b> : ${num.toString(2)}<br>
<b>Hex</b> : ${num.toString(16).toUpperCase()}<br>
<b>Octal</b> : ${num.toString(8)}
`;

}

// ===== PASSWORD GENERATOR =====

function generatePassword(){

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

let pass="";

for(let i=0;i<16;i++){

pass+=chars[Math.floor(Math.random()*chars.length)];

}

document.getElementById("passwordResult").innerHTML=pass;

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
1521:"Oracle",
3306:"MySQL",
3389:"Remote Desktop",
5432:"PostgreSQL",
5900:"VNC",
6379:"Redis",
8080:"HTTP Alternate"

};

hasil.innerHTML=ports[port]
? "🟢 "+ports[port]
: "⚪ Port tidak dikenali";

}

// ===== PING SIMULATOR =====

function pingHost(){

const host=document.getElementById("pingHost").value.trim();

const hasil=document.getElementById("pingResult");

if(host===""){

hasil.innerHTML="❌ Masukkan host";

return;

}

let html=`<b>PING ${host}</b><br><br>`;

for(let i=1;i<=4;i++){

html+=`Reply ${i} : time=${rand(2,20)} ms TTL=64<br>`;

}

html+="<br>Packet Loss : 0%";

hasil.innerHTML=html;

}

// ===== DNS LOOKUP =====

function dnsLookup(){

const domain=document.getElementById("dnsInput").value.trim();

const hasil=document.getElementById("dnsResult");

if(domain===""){

hasil.innerHTML="❌ Masukkan domain";

return;

}

const ip=`142.${rand(1,254)}.${rand(1,254)}.${rand(1,254)}`;

hasil.innerHTML=`
<b>Domain</b> : ${domain}<br>
<b>IPv4</b> : ${ip}<br>
<b>Status</b> : Active
`;

}

// ===== NETWORK SCANNER =====

function scanNetwork(){

const hasil=document.getElementById("scanResult");

let html="<b>🔍 Scan Result</b><br><br>";

const devices=[

["192.168.1.1","Gateway"],
["192.168.1.10","TNOS Server"],
["192.168.1.15","Laptop"],
["192.168.1.20","Printer"],
["192.168.1.30","Android"],
["192.168.1.40","Access Point"]

];

devices.forEach(d=>{

html+=`🟢 ${d[0]} - ${d[1]}<br>`;

});

hasil.innerHTML=html;

}

// ===================================
// TNOS V11 ULTIMATE
// SCRIPT PART 6
// ADVANCED NETWORK TOOLS
// ===================================

// ===== VLSM CALCULATOR =====

function hitungVLSM(){

const host=parseInt(prompt("Jumlah Host?"));

if(isNaN(host)||host<=0){

toast("❌ Host tidak valid");

return;

}

let bit=0;

while((Math.pow(2,bit)-2)<host){

bit++;

}

const prefix=32-bit;

const total=Math.pow(2,bit);

alert(
"Host : "+host+
"\nPrefix : /"+prefix+
"\nUsable Host : "+(total-2)+
"\nTotal Address : "+total
);

}

// ===== IPv4 TO INTEGER =====

function ipToInteger(){

const ip=prompt("Masukkan IPv4");

if(!ip)return;

const p=ip.split(".").map(Number);

if(p.length!==4||p.some(n=>isNaN(n)||n<0||n>255)){

alert("IP tidak valid");

return;

}

const value=(((p[0]<<24)>>>0)+((p[1]<<16)>>>0)+((p[2]<<8)>>>0)+p[3])>>>0;

alert("Integer : "+value);

}

// ===== TRACEROUTE =====

function traceroute(){

const host=prompt("Host tujuan");

if(!host)return;

let output="Traceroute ke "+host+"\n\n";

for(let i=1;i<=6;i++){

output+=i+
" 192.168."+i+".1  "+
rand(2,20)+" ms\n";

}

alert(output);

}

// ===== ARP TABLE =====

function arpTable(){

alert(`Address              MAC Address
192.168.1.1    00:11:22:33:44:55
192.168.1.10   34:91:AA:44:19:02
192.168.1.20   A4:22:90:CC:01:11`);

}

// ===== ROUTING TABLE =====

function routingTable(){

alert(`Destination      Gateway
0.0.0.0          192.168.1.1
192.168.1.0      Local
127.0.0.1        Loopback`);

}

// ===== EXPORT =====

function exportTXT(){

const data=`
TNOS V11 ULTIMATE

User : ${username}
Class : ${kelas}
Role : ${role}

Generated :
${new Date().toLocaleString()}
`;

const blob=new Blob([data],{type:"text/plain"});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="TNOS_Report.txt";

a.click();

}

// ===== FINISH =====

console.log("TNOS V11 Ultimate Loaded Successfully");



// ======================================
// TNOS V8 ULTIMATE FINAL
// PART 6
// FINISHING
// ======================================

// ===== STATUS SERVER =====

function updateServerStatus(){

const status=document.getElementById("serverStatus");

if(!status) return;

const online=Math.random()>0.1;

status.innerHTML=online?"🟢 ONLINE":"🔴 OFFLINE";

status.style.color=online?"#00ff66":"#ff4444";

}

setInterval(updateServerStatus,3000);
updateServerStatus();

// ===== RANDOM TRAFFIC =====

function updateTraffic(){

const up=document.getElementById("uploadSpeed");
const down=document.getElementById("downloadSpeed");

if(up) up.innerHTML=random(10,120)+" Mbps";

if(down) down.innerHTML=random(20,300)+" Mbps";

}

setInterval(updateTraffic,2000);
updateTraffic();

// ===== COPY RESULT =====

function copyResult(id){

const el=document.getElementById(id);

if(!el) return;

navigator.clipboard.writeText(el.innerText);

toast("📋 Berhasil disalin");

}

// ===== FULLSCREEN =====

function fullscreen(){

if(!document.fullscreenElement){

document.documentElement.requestFullscreen();

}else{

document.exitFullscreen();

}

}

// ===== AUTO REFRESH DASHBOARD =====

setInterval(()=>{

updateMonitor();
updateOnline();
updateTraffic();

},5000);

console.log("🚀 TNOS V8 Ultimate Ready");


