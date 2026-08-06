// ==============================
// TJKT NETWORK CONTROL CENTER V4
// ==============================

// Loader
window.onload = function () {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = "0";

        document.getElementById("loader").style.transition = "1s";

        setTimeout(() => {

            document.getElementById("loader").style.display = "none";

        },1000);

    },3000);

};

// ==============================
// CLOCK
// ==============================

function updateClock(){

const now=new Date();

const h=String(now.getHours()).padStart(2,"0");
const m=String(now.getMinutes()).padStart(2,"0");
const s=String(now.getSeconds()).padStart(2,"0");

document.getElementById("clock").innerHTML=
`${h}:${m}:${s} WIB`;

}

setInterval(updateClock,1000);

updateClock();

// ==============================
// RANDOM SERVER STATUS
// ==============================

function randomServer(){

document.getElementById("cpu").innerHTML=
Math.floor(Math.random()*25+65)+"%";

document.getElementById("ram").innerHTML=
Math.floor(Math.random()*30+50)+"%";

document.getElementById("storage").innerHTML=
Math.floor(Math.random()*20+45)+"%";

document.getElementById("ping").innerHTML=
Math.floor(Math.random()*20+10)+" ms";

}

setInterval(randomServer,2500);

randomServer();

// ==============================
// RANDOM COUNTER
// ==============================

function randomCounter(){

document.getElementById("client").innerHTML=
Math.floor(Math.random()*20+20);

document.getElementById("ap").innerHTML=
Math.floor(Math.random()*4+3);

document.getElementById("device").innerHTML=
Math.floor(Math.random()*15+18);

document.getElementById("service").innerHTML=
Math.floor(Math.random()*6+10);

}

setInterval(randomCounter,3000);

randomCounter();

// ==============================
// TERMINAL
// ==============================

const terminal=document.getElementById("terminal");

const log=[

"systemctl status nginx",

"✔ nginx.service active",

"",

"ping google.com",

"Reply from 8.8.8.8",

"time=18ms",

"",

"netstat",

"22 OPEN",

"80 OPEN",

"443 OPEN",

"",

"Backup Complete",

"Firewall Active",

"Server Online"

];

let i=0;

function typing(){

if(i<log.length){

terminal.innerHTML+=log[i]+"<br>";

terminal.scrollTop=terminal.scrollHeight;

i++;

setTimeout(typing,700);

}

}

typing();

// ==============================
// NOTIFICATION
// ==============================

const notify=document.getElementById("notify");

const pesan=[

"🟢 SERVER ONLINE",

"✔ BACKUP COMPLETE",

"🌐 CLIENT CONNECTED",

"🛡 FIREWALL ACTIVE",

"📡 NETWORK STABLE"

];

let n=0;

setInterval(()=>{

notify.innerHTML=pesan[n];

n++;

if(n>=pesan.length){

n=0;

}

},3000);

// ==============================
// CARD EFFECT
// ==============================

const card=document.querySelectorAll(".glass");

card.forEach(item=>{

item.addEventListener("mouseenter",()=>{

item.style.transform="translateY(-10px) scale(1.02)";

});

item.addEventListener("mouseleave",()=>{

item.style.transform="translateY(0px) scale(1)";

});

});
