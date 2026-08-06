// ======================
// LOADING SCREEN
// ======================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = "0";

        document.getElementById("loader").style.transition = "1s";

        setTimeout(() => {

            document.getElementById("loader").style.display = "none";

        },1000);

    },3000);

});

// ======================
// JAM DIGITAL
// ======================

function updateClock(){

const now = new Date();

const jam = String(now.getHours()).padStart(2,"0");
const menit = String(now.getMinutes()).padStart(2,"0");
const detik = String(now.getSeconds()).padStart(2,"0");

document.getElementById("clock").innerHTML =
jam+" : "+menit+" : "+detik+" WIB";

}

setInterval(updateClock,1000);

updateClock();


// ======================
// CPU RAM STORAGE
// ======================

const nilai = document.querySelectorAll(".card h1");

function randomStatus(){

nilai[0].innerHTML=Math.floor(Math.random()*30+60)+"%";

nilai[1].innerHTML=Math.floor(Math.random()*25+45)+"%";

nilai[2].innerHTML=Math.floor(Math.random()*40+35)+"%";

nilai[3].innerHTML=Math.floor(Math.random()*30+10)+" ms";

}

setInterval(randomStatus,2500);


// ======================
// FADE CARD
// ======================

const cards=document.querySelectorAll(".card");

cards.forEach((card,index)=>{

card.style.opacity="0";

card.style.transform="translateY(50px)";

setTimeout(()=>{

card.style.transition=".8s";

card.style.opacity="1";

card.style.transform="translateY(0px)";

},index*300);

});


// ======================
// NOTIFICATION
// ======================

const pesan=[

"🟢 Server Online",

"✔ Firewall Active",

"✔ Backup Success",

"🌐 Client Connected",

"💾 Database Synced"

];

let i=0;

setInterval(()=>{

console.log(pesan[i]);

i++;

if(i>=pesan.length){

i=0;

}

},3000);
