function login(){

const username=document.getElementById("username").value.trim();

const kelas=document.getElementById("kelas").value.trim();

const password=document.getElementById("password").value;

if(username==""||kelas==""){

document.getElementById("loginStatus").innerHTML="Lengkapi data!";

return;

}

if(password!=="tnos2026"){

document.getElementById("loginStatus").innerHTML="Password salah!";

return;

}

localStorage.setItem("tnos_username",username);

localStorage.setItem("tnos_kelas",kelas);

window.location.href="index.html";

}
