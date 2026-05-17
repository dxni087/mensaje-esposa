// ── Configuración de mensajes ──────────────────────────────────────────────
const messages = [
  {
    day: 'Lunes',
    date: '2026-05-18',
    color: '#E91E63',
    petals: ['#E91E63','#F48FB1','#FF80AB'],
    message: 'Odette, arrancando la semana lejos pero pensando en ti, como siempre. Quería decirte algo que a veces no digo: gracias por todo lo que haces por mí. El hombre que soy hoy es por ti — y también estoy trabajando día con día para ser el que tú mereces.'
  },
  {
    day: 'Martes',
    date: '2026-05-19',
    color: '#FDD835',
    petals: ['#FDD835','#FFEE58','#FFF176'],
    message: 'Día dos, Odette. Sigo pensando en ti más seguido de lo que crees. A veces se me olvida decírtelo, pero noto todo lo que haces por mí. Cada día me esfuerzo por ser mejor, por estar a la altura de la mujer que tengo al lado.'
  },
  {
    day: 'Miércoles',
    date: '2026-05-20',
    color: '#7B1FA2',
    petals: ['#7B1FA2','#CE93D8','#E1BEE7'],
    message: 'Mitad de semana, Odette. Te extraño. Mucho de lo bueno que tengo en la vida es porque tú estás conmigo, y por eso mismo no me detengo — me sigo formando, todos los días, para ser el hombre que tú necesitas.'
  },
  {
    day: 'Jueves',
    date: '2026-05-21',
    color: '#F4511E',
    petals: ['#F4511E','#FF8A65','#FFCCBC'],
    message: 'Casi nos vemos, Odette. Pensando en lo afortunado que soy de tenerte. Tú me haces mejor, y eso me motiva a seguir creciendo. Quiero llegar a ser exactamente el hombre que mereces.'
  },
  {
    day: 'Viernes',
    date: '2026-05-22',
    color: '#1565C0',
    petals: ['#1565C0','#64B5F6','#BBDEFB'],
    message: 'Último día lejos, Odette. Esta semana me confirmó algo: contigo todo funciona mejor. Gracias por estar pendiente de mí siempre. Sigo formándome cada día — por mí, pero sobre todo por ti y por nosotros.'
  },
  {
    day: 'Sábado',
    date: '2026-05-23',
    color: '#00695C',
    petals: ['#00695C','#4DB6AC','#E0F2F1'],
    message: 'De vuelta a casa, Odette. Llevé tu recuerdo conmigo toda la semana. Gracias por ser quien eres y por hacerme querer ser mejor cada día. Te amo.'
  }
];

// ── Flores SVG estilo Lego ─────────────────────────────────────────────────
function legoFlowerSVG(colors, size = 80) {
  const [main, mid, center] = colors;
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="50" cy="17" r="16" fill="${main}"/>
    <circle cx="75" cy="29" r="16" fill="${main}"/>
    <circle cx="75" cy="71" r="16" fill="${main}"/>
    <circle cx="50" cy="83" r="16" fill="${main}"/>
    <circle cx="25" cy="71" r="16" fill="${main}"/>
    <circle cx="25" cy="29" r="16" fill="${main}"/>
    <circle cx="50" cy="50" r="22" fill="${mid}"/>
    <circle cx="50" cy="50" r="11" fill="${center}" stroke="${main}" stroke-width="2"/>
  </svg>`;
}

// ── Helpers de fecha ───────────────────────────────────────────────────────
function todayStr() {
  const t = new Date();
  return t.getFullYear() + '-' +
    String(t.getMonth() + 1).padStart(2,'0') + '-' +
    String(t.getDate()).padStart(2,'0');
}

function isUnlocked(dateStr) {
  return todayStr() >= dateStr;
}

function formatDate(dateStr) {
  const [y,m,d] = dateStr.split('-').map(Number);
  const meses = ['enero','febrero','marzo','abril','mayo','junio',
                 'julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${d} de ${meses[m-1]}`;
}

// ── Renderizar tarjetas ────────────────────────────────────────────────────
function renderCards() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  messages.forEach((msg, i) => {
    const unlocked = isUnlocked(msg.date);
    const card = document.createElement('div');
    card.className = 'card ' + (unlocked ? 'unlocked' : 'locked');
    card.style.transitionDelay = `${i * 0.08}s`;

    card.innerHTML = `
      <div class="card-stripe" style="background:${msg.color}"></div>
      <div class="card-body">
        <div class="card-flower">
          ${unlocked
            ? legoFlowerSVG(msg.petals)
            : `<svg viewBox="0 0 100 100" width="80" height="80"><text x="50" y="65" font-size="52" text-anchor="middle">🔒</text></svg>`
          }
        </div>
        <div class="card-info">
          <div class="card-day" style="color:${msg.color}">${msg.day}</div>
          <div class="card-date">${formatDate(msg.date)}</div>
          <span class="card-badge" style="${unlocked ? `background:${msg.color}` : ''}">
            ${unlocked ? '¡Ábreme! 💕' : 'Próximamente'}
          </span>
        </div>
        ${unlocked ? '' : '<div class="card-lock">🌸</div>'}
      </div>
    `;

    if (unlocked) {
      card.addEventListener('click', () => openModal(i));
    }

    grid.appendChild(card);
  });
}

// ── Modal ──────────────────────────────────────────────────────────────────
function openModal(i) {
  const msg = messages[i];
  const modal = document.getElementById('modal');

  document.getElementById('modalDay').textContent = msg.day;
  document.getElementById('modalMessage').textContent = msg.message;
  document.getElementById('modalFlower').innerHTML = legoFlowerSVG(msg.petals, 100);
  modal.querySelector('.modal-content').style.setProperty('--modal-color', msg.color);

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  spawnHearts();
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

function spawnHearts() {
  const container = document.getElementById('hearts');
  container.innerHTML = '';
  const chars = ['❤️','💖','💗','💕','🌸','✨'];
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = chars[Math.floor(Math.random() * chars.length)];
    h.style.left = Math.random() * 90 + '%';
    h.style.bottom = Math.random() * 20 + '%';
    h.style.animationDelay = (Math.random() * 0.8) + 's';
    container.appendChild(h);
  }
}

// ── Countdown ─────────────────────────────────────────────────────────────
function updateCountdown() {
  const el = document.getElementById('countdownText');
  const next = messages.find(m => !isUnlocked(m.date));

  if (!next) {
    el.textContent = '✨ Todos los mensajes disponibles ✨';
    document.querySelector('.countdown-dot').style.background = '#4CAF50';
    return;
  }

  const [y,mo,d] = next.date.split('-').map(Number);
  const diff = new Date(y, mo-1, d, 0,0,0) - new Date();

  if (diff <= 0) { renderCards(); return; }

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  el.textContent = `Próximo mensaje (${next.day}) en ${h}h ${m}m ${s}s`;
  document.querySelector('.countdown-dot').style.background = next.color;
}

// ── Flores de fondo (Lego miniaturas) ─────────────────────────────────────
function createBgFlowers() {
  const container = document.getElementById('bgFlowers');
  const colorSets = [
    ['#E91E63','#F48FB1','#FF80AB'],
    ['#FDD835','#FFEE58','#FFF176'],
    ['#7B1FA2','#CE93D8','#E1BEE7'],
    ['#F4511E','#FF8A65','#FFCCBC'],
    ['#1565C0','#64B5F6','#BBDEFB'],
    ['#00695C','#4DB6AC','#E0F2F1'],
  ];

  for (let i = 0; i < 16; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bg-flower';
    const size = 50 + Math.random() * 80;
    const colors = colorSets[i % colorSets.length];

    wrapper.innerHTML = legoFlowerSVG(colors, size);
    wrapper.style.left = Math.random() * 100 + '%';
    wrapper.style.bottom = '-100px';
    wrapper.style.animationDuration = (20 + Math.random() * 30) + 's';
    wrapper.style.animationDelay = (Math.random() * 25) + 's';
    container.appendChild(wrapper);
  }
}

// ── Scroll Reveal (IntersectionObserver) ──────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });

  // Revelar elementos generales
  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

  // Observar cards (se generan dinámicamente)
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card').forEach(card => cardObserver.observe(card));
}

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createBgFlowers();
  renderCards();
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Revelar hero text inmediatamente (ya está en viewport)
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-up').forEach(el => el.classList.add('in-view'));
  }, 100);

  initScrollReveal();

  document.getElementById('closeBtn').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target.id === 'modal') closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
