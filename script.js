const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideshowInterval;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startAutoSlide() {
  slideshowInterval = setInterval(() => showSlide(currentSlide + 1), 4000);
}

document.getElementById('nextSlide').addEventListener('click', () => {
  clearInterval(slideshowInterval);
  showSlide(currentSlide + 1);
  startAutoSlide();
});

document.getElementById('prevSlide').addEventListener('click', () => {
  clearInterval(slideshowInterval);
  showSlide(currentSlide - 1);
  startAutoSlide();
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(slideshowInterval);
    showSlide(parseInt(dot.dataset.index));
    startAutoSlide();
  });
});

startAutoSlide();


const themeButtons = document.querySelectorAll('.theme-btn');

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    document.body.className = theme === 'dark' ? '' : `theme-${theme}`;
    themeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.querySelector('[data-theme="dark"]').classList.add('active');


const form = document.getElementById('contactForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const mensagem = document.getElementById('mensagem');
  const success = document.getElementById('form-success');

  let valid = true;

  ['nome', 'email', 'mensagem'].forEach(id => {
    document.getElementById(id).classList.remove('error');
    document.getElementById(`erro-${id}`).textContent = '';
  });
  success.textContent = '';

  if (nome.value.trim() === '') {
    nome.classList.add('error');
    document.getElementById('erro-nome').textContent = 'Por favor, informe seu nome.';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === '') {
    email.classList.add('error');
    document.getElementById('erro-email').textContent = 'Por favor, informe seu e-mail.';
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    email.classList.add('error');
    document.getElementById('erro-email').textContent = 'Informe um e-mail válido.';
    valid = false;
  }

  if (mensagem.value.trim() === '') {
    mensagem.classList.add('error');
    document.getElementById('erro-mensagem').textContent = 'Por favor, escreva sua mensagem.';
    valid = false;
  }

  if (valid) {
    success.textContent = '✅ Mensagem enviada com sucesso!';
    form.reset();
  }
});


const quizQuestions = [
  {
    question: 'Quantos fragmentos de lixo espacial maiores que 10 cm são rastreados atualmente?',
    options: ['Cerca de 5.000', 'Mais de 27.000', 'Aproximadamente 1.000', 'Menos de 500'],
    answer: 1
  },
  {
    question: 'A que velocidade os detritos espaciais orbitam a Terra?',
    options: ['1.000 km/h', '5.000 km/h', '28.000 km/h', '100.000 km/h'],
    answer: 2
  },
  {
    question: 'Qual agência opera o maior sistema de rastreamento de detritos espaciais?',
    options: ['ESA', 'NASA', 'JAXA', 'ROSCOSMOS'],
    answer: 1
  },
  {
    question: 'O que é o Síndrome de Kessler?',
    options: [
      'Um tipo de satélite de monitoramento',
      'Uma lei internacional sobre o espaço',
      'Reação em cadeia de colisões que torna a órbita inutilizável',
      'Um método de limpeza orbital'
    ],
    answer: 2
  },
  {
    question: 'Qual órbita concentra a maior quantidade de lixo espacial?',
    options: ['Órbita Geoestacionária (GEO)', 'Órbita Baixa Terrestre (LEO)', 'Órbita Lunar', 'Órbita de Transferência'],
    answer: 1
  },
  {
    question: 'Qual foi a primeira colisão confirmada entre satélites inteiros?',
    options: [
      'Cosmos 954 e Explorer 1 em 1978',
      'Iridium 33 e Cosmos 2251 em 2009',
      'ERS-1 e Envisat em 2012',
      'Sputnik 1 e Vanguard 1 em 1960'
    ],
    answer: 1
  },
  {
    question: 'Qual país causou um dos maiores eventos de criação de detritos ao destruir seu próprio satélite em 2007?',
    options: ['Rússia', 'Estados Unidos', 'China', 'Índia'],
    answer: 2
  },
  {
    question: 'Qual tecnologia o OrbitGuard utiliza para prever colisões?',
    options: ['Inteligência Artificial apenas', 'Sensores e integração com APIs orbitais', 'Telescópios terrestres', 'Comunicação via rádio'],
    answer: 1
  },
  {
    question: 'Qual ODS da ONU o OrbitGuard contribui diretamente?',
    options: ['ODS 2 – Fome Zero', 'ODS 6 – Água Limpa', 'ODS 9 – Inovação e Infraestrutura', 'ODS 14 – Vida na Água'],
    answer: 2
  },
  {
    question: 'Qual empresa coordena mais de 6.000 satélites em órbita baixa usando algoritmos em tempo real?',
    options: ['Blue Origin', 'Boeing', 'SpaceX (Starlink)', 'Amazon Kuiper'],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  const q = quizQuestions[currentQuestion];
  document.getElementById('q-current').textContent = currentQuestion + 1;
  document.getElementById('quiz-question').textContent = q.question;
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-next').style.display = 'none';

  const optionsDiv = document.getElementById('quiz-options');
  optionsDiv.innerHTML = '';
  answered = false;

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i));
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = quizQuestions[currentQuestion];
  const options = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quiz-feedback');

  options.forEach(btn => btn.disabled = true);
  options[q.answer].classList.add('correct');

  if (index === q.answer) {
    score++;
    feedback.textContent = '✅ Correto!';
    feedback.style.color = '#00ffaa';
  } else {
    options[index].classList.add('wrong');
    feedback.textContent = '❌ Errado!';
    feedback.style.color = '#ff4d4d';
  }

  if (currentQuestion < quizQuestions.length - 1) {
    document.getElementById('quiz-next').style.display = 'inline-block';
  } else {
    setTimeout(showResult, 1200);
  }
}

function showResult() {
  document.getElementById('quiz-progress').style.display = 'none';
  document.getElementById('quiz-question').style.display = 'none';
  document.getElementById('quiz-options').style.display = 'none';
  document.getElementById('quiz-feedback').style.display = 'none';
  document.getElementById('quiz-next').style.display = 'none';

  const result = document.getElementById('quiz-result');
  result.style.display = 'block';

  let emoji = score >= 8 ? '🚀' : score >= 5 ? '🛰️' : '🌍';
  document.getElementById('quiz-score').textContent =
    `${emoji} Você acertou ${score} de ${quizQuestions.length} perguntas! ${score >= 8 ? 'Excelente domínio espacial!' : score >= 5 ? 'Bom conhecimento!' : 'Continue explorando o universo!'}`;
}

document.getElementById('quiz-next').addEventListener('click', () => {
  currentQuestion++;
  loadQuestion();
});

document.getElementById('quiz-restart').addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;

  document.getElementById('quiz-progress').style.display = 'block';
  document.getElementById('quiz-question').style.display = 'block';
  document.getElementById('quiz-options').style.display = 'flex';
  document.getElementById('quiz-feedback').style.display = 'block';
  document.getElementById('quiz-result').style.display = 'none';

  loadQuestion();
});

loadQuestion();