function login(){

const username=document.getElementById("username").value.trim();
const kelas=document.getElementById("kelas").value.trim();
const password=document.getElementById("password").value.trim();

if(username==="" || kelas===""){
document.getElementById("loginStatus").innerHTML="❌ Nama dan kelas wajib diisi!";
return;
}

if(password!=="tnos2026"){
document.getElementById("loginStatus").innerHTML="❌ Password salah!";
return;
}

let role="user";

if(
username.toLowerCase()=="musyaffa hanif sunni" &&
kelas.toLowerCase()=="xi tjkt 2"
){
role="admin";
}

localStorage.setItem("tnos_username",username);
localStorage.setItem("tnos_kelas",kelas);
localStorage.setItem("tnos_role",role);

window.location.href="index.html";

}
