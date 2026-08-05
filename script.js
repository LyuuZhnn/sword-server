// ===== JAM DIGITAL =====
function updateClock() {
    const now = new Date();

    const jam = String(now.getHours()).padStart(2, '0');
    const menit = String(now.getMinutes()).padStart(2, '0');
    const detik = String(now.getSeconds()).padStart(2, '0');

    document.getElementById("clock").innerHTML =
        jam + ":" + menit + ":" + detik + " WIB";
}

setInterval(updateClock, 1000);
updateClock();


// ===== ANIMASI CARD =====
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.03)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
    });
});


// ===== PESAN SELAMAT DATANG =====
window.onload = function () {
    console.log("TJKT NETWORK SERVER BERHASIL DIMUAT");
};
