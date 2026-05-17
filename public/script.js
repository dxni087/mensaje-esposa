// Configuración de mensajes - un mensaje por día (Lunes a Sábado)
// Las fechas están en formato YYYY-MM-DD (zona horaria local)
const messages = [
  {
    day: 'Lunes',
    date: '2026-05-18',
    icon: '🌹',
    message: 'Mi amor, hoy comienzo este viaje pero quiero que sepas que tú vienes conmigo en cada pensamiento. Esta semana puede que esté lejos en distancia, pero mi corazón sigue contigo, latiendo a tu lado. Cuida mucho de ti, que yo regreso pronto a abrazarte.'
  },
  {
    day: 'Martes',
    date: '2026-05-19',
    icon: '🌷',
    message: 'Hoy desperté pensando en tu sonrisa, esa que ilumina mis mañanas. ¿Sabes? El sol allá donde estés brilla porque tú lo estás mirando. Eres lo más bonito que me ha pasado, y cada día lejos me confirma lo mucho que te amo.'
  },
  {
    day: 'Miércoles',
    date: '2026-05-20',
    icon: '🌸',
    message: 'Vamos a mitad de semana, mi vida. Quiero recordarte lo orgulloso que estoy de ti, de la mujer increíble que eres. Gracias por ser mi compañera, mi hogar, mi paz. Hoy te mando un beso enorme y todo mi amor envuelto en pétalos.'
  },
  {
    day: 'Jueves',
    date: '2026-05-21',
    icon: '💐',
    message: 'Hoy pensé en nuestra historia y me di cuenta de algo: contigo todo es mejor. El café, las noches, las risas, hasta el silencio. Te extraño con cada parte de mí, pero también celebro saber que tengo a alguien tan especial esperándome.'
  },
  {
    day: 'Viernes',
    date: '2026-05-22',
    icon: '🌺',
    message: 'Ya casi, mi amor. Un día más y estaré contigo. Quiero que sepas que estos días lejos no han hecho más que recordarme cuánto te necesito en mi vida. Eres mi razón, mi inspiración y la dueña absoluta de mi corazón. Te amo infinito.'
  },
  {
    day: 'Sábado',
    date: '2026-05-23',
    icon: '🥀',
    message: 'Hoy nos volvemos a ver, mi amor. Esta semana sin ti me confirmó que tú eres mi lugar favorito en el mundo. Gracias por esperarme, por amarme, por ser tú. Prepárate porque vengo con muchos abrazos, muchos besos y todo el amor que se acumuló estos días.'
  }
];

// Generar pétalos flotantes
function createPetals() {
  const petalsContainer = document.getElementById('petals');
  const petalEmojis = ['🌸', '🌺', '🌷', '🌹', '💮', '🏵️'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (8 + Math.random() * 10) + 's';
    petal.style.animationDelay = Math.random() * 10 + 's';
    petal.style.fontSize = (16 + Math.random() * 18) + 'px';
    petalsContainer.appendChild(petal);
  }
}

// Comprobar si la fecha actual permite desbloquear el mensaje
function isUnlocked(dateStr) {
  const today = new Date();
  const todayStr = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');
  return todayStr >= dateStr;
}

// Formatear fecha en español
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${date.getDate()} de ${meses[date.getMonth()]}`;
}

// Renderizar tarjetas
function renderCards() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  messages.forEach((msg, index) => {
    const unlocked = isUnlocked(msg.date);
    const card = document.createElement('div');
    card.className = 'card ' + (unlocked ? 'unlocked' : 'locked');
    card.innerHTML = `
      <span class="card-icon">${unlocked ? msg.icon : '🔒'}</span>
      <h3 class="card-day">${msg.day}</h3>
      <p class="card-date">${formatDate(msg.date)}</p>
      <span class="card-status">${unlocked ? 'Ábreme 💕' : 'Pronto'}</span>
    `;

    if (unlocked) {
      card.addEventListener('click', () => openModal(index));
    }

    grid.appendChild(card);
  });
}

// Abrir modal con mensaje
function openModal(index) {
  const msg = messages[index];
  document.getElementById('modalDay').textContent = msg.day;
  document.getElementById('modalMessage').textContent = msg.message;
  document.querySelector('.flower-decoration').textContent = msg.icon;

  const modal = document.getElementById('modal');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');

  spawnHearts();
}

// Cerrar modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

// Animación de corazones
function spawnHearts() {
  const container = document.getElementById('hearts');
  container.innerHTML = '';
  const heartChars = ['❤️', '💖', '💗', '💕', '🌸'];
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '0';
    heart.style.animationDelay = (Math.random() * 0.8) + 's';
    container.appendChild(heart);
  }
}

// Contador hasta el próximo desbloqueo
function updateCountdown() {
  const countdownEl = document.getElementById('countdown');
  const next = messages.find(m => !isUnlocked(m.date));

  if (!next) {
    countdownEl.textContent = '✨ Todos los mensajes están disponibles ✨';
    return;
  }

  const [y, mo, d] = next.date.split('-').map(Number);
  const target = new Date(y, mo - 1, d, 0, 0, 0);
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    renderCards();
    return;
  }

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  countdownEl.textContent = `🌹 Próximo mensaje (${next.day}) en ${hours}h ${minutes}m ${seconds}s`;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  createPetals();
  renderCards();
  updateCountdown();
  setInterval(updateCountdown, 1000);

  document.getElementById('closeBtn').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
