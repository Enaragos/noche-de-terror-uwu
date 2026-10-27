/* =========================================================
   CONFIGURA AQUÍ
   ========================================================= */
const CONFIG = {
  // Inicio de la cuenta regresiva (año, mes 0-11, día, hora 24h, minutos). Octubre = 9
  inicio: new Date(2026, 9, 30, 0, 0, 0),
};

const $ = (id) => document.getElementById(id);

/* ---------- Portada ---------- */
$("btnEntrar").addEventListener("click", () => {
  $("portada").classList.add("oculta");
  $("contenido").classList.add("visible");
  relampago();
  iniciarMurcielagos();
});

/* ---------- Relámpagos aleatorios ---------- */
function relampago() {
  const el = $("relampago");
  el.classList.remove("activo");
  void el.offsetWidth;
  el.classList.add("activo");
}
setInterval(() => {
  if (Math.random() < 0.35) relampago();
}, 9000);

/* ---------- Glitch del título ---------- */
const titulo = document.querySelector(".glitch");
setInterval(() => {
  titulo.classList.add("activo");
  setTimeout(() => titulo.classList.remove("activo"), 350);
}, 4500);

/* ---------- Cuenta regresiva ---------- */
const pad = (n) => String(n).padStart(2, "0");

function actualizarCuenta() {
  const diff = CONFIG.inicio - new Date();
  const msg = $("mensajeCuenta");

  if (diff <= 0) {
    ["dias", "horas", "minutos", "segundos"].forEach((id) => ($(id).textContent = "00"));
    msg.textContent = "☠️ La noche ya comenzó...";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  $("dias").textContent = pad(d);
  $("horas").textContent = pad(h);
  $("minutos").textContent = pad(m);
  $("segundos").textContent = pad(s);

  if (d === 0) msg.textContent = "🔥 ¡Es HOY! Prepara la cobija.";
  else if (d === 1) msg.textContent = "🌑 Mañana empieza todo...";
  else msg.textContent = "";
}
actualizarCuenta();
setInterval(actualizarCuenta, 1000);

/* ---------- Murciélagos en el canvas ---------- */
function iniciarMurcielagos() {
  const canvas = $("murcielagos");
  const ctx = canvas.getContext("2d");
  const ajustar = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  ajustar();
  addEventListener("resize", ajustar);

  const bats = Array.from({ length: 7 }, () => nuevo(true));

  function nuevo(inicial) {
    return {
      x: inicial ? Math.random() * canvas.width : -40,
      y: Math.random() * canvas.height * 0.6,
      v: 1 + Math.random() * 2,
      t: Math.random() * 10,
      s: 0.6 + Math.random() * 0.9,
    };
  }

  function dibujar(b) {
    const ala = Math.sin(b.t * 0.5) * 10 * b.s;
    ctx.save();
    ctx.translate(b.x, b.y + Math.sin(b.t * 0.15) * 20);
    ctx.scale(b.s, b.s);
    ctx.fillStyle = "#0a0610";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-14, -12 - ala, -30, -4 - ala);
    ctx.quadraticCurveTo(-20, 2, -14, 6);
    ctx.quadraticCurveTo(-8, 2, 0, 8);
    ctx.quadraticCurveTo(8, 2, 14, 6);
    ctx.quadraticCurveTo(20, 2, 30, -4 - ala);
    ctx.quadraticCurveTo(14, -12 - ala, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  (function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bats.forEach((b, i) => {
      b.x += b.v; b.t += 1;
      if (b.x > canvas.width + 40) bats[i] = nuevo(false);
      dibujar(b);
    });
    requestAnimationFrame(loop);
  })();
}

/* ---------- Pequeño susto escondido ---------- */
// Toca 5 veces la luna grande para activarlo 😈
let toques = 0;
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("luna-grande")) return;
  toques++;
  if (toques >= 5) {
    toques = 0;
    const susto = document.createElement("div");
    susto.className = "susto activo";
    susto.textContent = "💀";
    document.body.appendChild(susto);
    relampago();
    setTimeout(() => susto.remove(), 900);
  }
});
