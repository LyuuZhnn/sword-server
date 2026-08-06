const users = [

{
username:"Musyaffa Hanif Sunni",
kelas:"XI TJKT 2",
password:"musyaffa123",
role:"admin"
},

{
username:"Anjay Alok",
kelas:"XI TJKT 4",
password:"alok123",
role:"user"
},

{
username:"Rizky",
kelas:"XI TJKT 1",
password:"rizky321",
role:"user"
}

];

function login(){

const username=document.getElementById("username").value.trim();
const kelas=document.getElementById("kelas").value.trim();
const password=document.getElementById("password").value;

const user=users.find(u=>

u.username.toLowerCase()==username.toLowerCase()&&
u.kelas.toLowerCase()==kelas.toLowerCase()&&
u.password==password

);

if(!user){

document.getElementById("loginStatus").innerHTML=
"❌ Nama, kelas, atau password salah!";

return;

}

localStorage.setItem("tnos_username",user.username);
localStorage.setItem("tnos_kelas",user.kelas);
localStorage.setItem("tnos_role",user.role);

window.location.href="index.html";

}
