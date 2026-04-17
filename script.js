// ==========================================================================
// 1. DADOS DA APLICAÇÃO
// ==========================================================================
const citiesData = [
  {
    name: "Londrina",
    tag: "A Capital Histórica",
    description: "Antiga 'Capital Mundial do Café', foi o epicentro da expansão nas décadas de 50 e 60. Hoje, abriga o Museu Histórico que preserva toda a memória da época de ouro."
  },
  {
    name: "Norte Pioneiro",
    tag: "Polo de Cafés Especiais",
    description: "Após as crises climáticas, a região se reinventou. Hoje possui Indicação Geográfica (INPI) e produz Cafés Especiais 100% Arábica, famosos por sua doçura natural."
  },
  {
    name: "Ribeirão Claro",
    tag: "Turismo de Experiência",
    description: "Mistura a rica herança cafeeira com o ecoturismo. Oferece aos visitantes passeios por antigas fazendas, trilhas ecológicas e degustações guiadas de cafés premiados."
  }
];

const faqData = [
  {
    question: "Como o 'Ouro Verde' transformou a geografia do Paraná?",
    answer: "Entre 1940 e 1970, o cultivo de café provocou uma explosão demográfica. A necessidade de escoar os grãos acelerou a construção de ferrovias e fundou dezenas de municípios."
  },
  {
    question: "O que foi a trágica 'Geada Negra' de 1975?",
    answer: "Uma onda de frio histórico congelou a seiva das plantas, queimando quase 100% das lavouras comerciais numa única noite, forçando a introdução de novas culturas como a soja."
  },
  {
    question: "O Paraná ainda produz muito café atualmente?",
    answer: "O volume diminuiu, mas a qualidade disparou! Produtores adotaram alta tecnologia e práticas de sustentabilidade, migrando da produção em massa para o mercado de excelência."
  }
];

// ==========================================================================
// 2. FUNÇÕES DE RENDERIZAÇÃO
// ==========================================================================
function renderCities() {
  const container = document.getElementById('cities-grid');
  if (!container) return; // Segurança contra erros
  
  container.innerHTML = citiesData.map(city => `
    <article class="card">
      <span style="color:var(--accent); font-weight:bold; font-size:0.9rem">${city.tag}</span>
      <h3 style="margin-top:10px">${city.name}</h3>
      <p>${city.description}</p>
    </article>
  `).join('');
}

function renderAccordions() {
  const container = document.getElementById('accordion-container');
  if (!container) return;
  
  container.innerHTML = faqData.map((faq, index) => `
    <div class="accordion-item">
      <button class="accordion-header" aria-expanded="false" aria-controls="content-${index}">
        ${faq.question} <span>+</span>
      </button>
      <div id="content-${index}" class="accordion-content">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');

  // Lógica de clique do acordeão
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
      const isActive = item.classList.contains('active');
      header.setAttribute('aria-expanded', isActive);
      header.querySelector('span').innerText = isActive ? '-' : '+';
    });
  });
}

// ==========================================================================
// 3. LÓGICA DO CARROSSEL (Autoplay)
// ==========================================================================
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const slides = track ? Array.from(track.children) : [];
  const nextBtn = document.getElementById('carousel-next');
  const prevBtn = document.getElementById('carousel-prev');
  const wrapper = document.querySelector('.carousel-wrapper');
  
  if (!track || slides.length === 0) return;

  let currentIdx = 0;
  let timer;

  const moveSlide = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
    currentIdx = index;
  };

  const nextSlide = () => moveSlide(currentIdx === slides.length - 1 ? 0 : currentIdx + 1);
  const prevSlide = () => moveSlide(currentIdx === 0 ? slides.length - 1 : currentIdx - 1);

  const startTimer = () => { clearInterval(timer); timer = setInterval(nextSlide, 4000); };
  const stopTimer = () => clearInterval(timer);

  nextBtn.addEventListener('click', () => { nextSlide(); startTimer(); });
  prevBtn.addEventListener('click', () => { prevSlide(); startTimer(); });

  wrapper.addEventListener('mouseenter', stopTimer);
  wrapper.addEventListener('mouseleave', startTimer);

  startTimer();
}

// ==========================================================================
// 4. ACESSIBILIDADE E ANIMAÇÕES
// ==========================================================================
function initA11y() {
  let fontSize = 16;
  const root = document.documentElement;

  const btnInc = document.getElementById('btn-increase-font');
  const btnDec = document.getElementById('btn-decrease-font');
  const btnCont = document.getElementById('btn-contrast');

  if(btnInc) btnInc.addEventListener('click', () => { if (fontSize < 24) root.style.fontSize = `${fontSize += 2}px`; });
  if(btnDec) btnDec.addEventListener('click', () => { if (fontSize > 12) root.style.fontSize = `${fontSize -= 2}px`; });
  if(btnCont) btnCont.addEventListener('click', () => document.body.classList.toggle('high-contrast'));
}

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ==========================================================================
// 5. INICIALIZAÇÃO GERAL
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderCities();
  renderAccordions();
  initCarousel();
  initA11y();
  initReveal();
});
