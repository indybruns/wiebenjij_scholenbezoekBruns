const roles = [
  {
    id: "projectdirecteur",
    name: "Projectdirecteur",
    image: "Rollen/Projectdirecteur.png",
    description: "Jij houdt graag het grote geheel in de gaten. Je vindt het interessant om verschillende mensen en werkzaamheden samen te brengen en samen naar een sterk eindresultaat toe te werken.",
    traits: ["Overzicht", "Beslissingen nemen", "Samenwerken"],
    short: "Houdt overzicht en brengt mensen samen."
  },
  {
    id: "projectassistent",
    name: "Projectassistent",
    image: "Rollen/Projectassistent.png",
    description: "Jij zorgt graag dat dingen goed geregeld zijn. Je houdt informatie overzichtelijk en helpt het projectteam om afspraken, informatie en werkzaamheden bij elkaar te brengen.",
    traits: ["Organiseren", "Nauwkeurig", "Behulpzaam"],
    short: "Houdt informatie en afspraken op orde."
  },
  {
    id: "engineer",
    name: "Engineer",
    image: "Rollen/Engineer.png",
    description: "Jij wilt weten hoe een idee echt gemaakt kan worden. Je denkt technische oplossingen uit en vertaalt ideeën naar iets waarmee anderen verder kunnen.",
    traits: ["Oplossingsgericht", "Technisch denken", "Uitdenken"],
    short: "Denkt uit hoe ideeën echt gemaakt kunnen worden."
  },
  {
    id: "technisch-specialist",
    name: "Technisch specialist",
    image: "Rollen/Technisch Specialist.png",
    description: "Jij wilt dat techniek niet alleen bedacht wordt, maar ook echt werkt. Machines, beweging, elektronica en interactieve onderdelen trekken jouw aandacht.",
    traits: ["Nieuwsgierig", "Technisch", "Probleemoplossend"],
    short: "Zorgt dat techniek in de praktijk werkt."
  },
  {
    id: "grafisch-specialist",
    name: "Grafisch specialist",
    image: "Rollen/Grafisch Specialist.png",
    description: "Jij denkt in beeld. Je vindt het interessant hoe vorm, kleur en grafische elementen kunnen helpen om een verhaal zichtbaar en begrijpelijk te maken.",
    traits: ["Creatief", "Visueel", "Oog voor detail"],
    short: "Maakt verhalen zichtbaar met beeld en vorm."
  },
  {
    id: "interieurbouwer",
    name: "Interieurbouwer",
    image: "Rollen/Meubelmaker.png",
    description: "Jij bent een maker. Je werkt graag met je handen en vindt het mooi om materialen te veranderen in iets wat bezoekers uiteindelijk echt kunnen zien en gebruiken.",
    traits: ["Praktisch", "Vakmanschap", "Aanpakken"],
    short: "Maakt met de hand ideeën tastbaar."
  },
  {
    id: "vitrinebouwer",
    name: "Vitrinebouwer",
    image: "Rollen/Vitrinebouwer.png",
    description: "Jij werkt graag precies. Bij een vitrine komen glas, techniek, constructie en afwerking samen. Jij vindt het belangrijk dat alles tot in de details klopt.",
    traits: ["Nauwkeurig", "Technisch", "Kwaliteitsgericht"],
    short: "Combineert precisie, techniek en afwerking."
  }
];

const app = document.querySelector("#app");
const questionList = [
  { roleId: "projectdirecteur", text: "Ik vind het leuk om het overzicht te houden als we samen aan iets werken." },
  { roleId: "engineer", text: "Ik vind het leuk om uit te zoeken hoe je een idee echt kunt maken." },
  { roleId: "projectassistent", text: "Ik vind het leuk om dingen goed te regelen en te organiseren." },
  { roleId: "grafisch-specialist", text: "Ik vind het leuk om bezig te zijn met beeld, kleur en vorm." },
  { roleId: "technisch-specialist", text: "Ik ben nieuwsgierig naar hoe machines en techniek werken." },
  { roleId: "vitrinebouwer", text: "Ik werk graag precies en netjes." },
  { roleId: "interieurbouwer", text: "Ik werk graag met mijn handen en verschillende materialen." },
  { roleId: "projectassistent", text: "Ik help graag anderen en zorg dat afspraken duidelijk zijn." },
  { roleId: "vitrinebouwer", text: "Ik vind het leuk om iets te maken waarbij alles precies moet passen en kloppen." },
  { roleId: "projectdirecteur", text: "Ik durf keuzes te maken als een groep moet beslissen wat we gaan doen." },
  { roleId: "interieurbouwer", text: "Ik vind het leuk om iets te bouwen waarvan je daarna echt het resultaat kunt zien." },
  { roleId: "engineer", text: "Als iets moeilijk is, zoek ik graag naar een slimme oplossing." },
  { roleId: "technisch-specialist", text: "Als iets niet werkt, wil ik graag uitzoeken waarom." },
  { roleId: "grafisch-specialist", text: "Ik vind het leuk om iets zo vorm te geven dat het er duidelijk en aantrekkelijk uitziet." }
];

const state = {
  page: "home",
  questionIndex: 0,
  answers: Array(questionList.length).fill(null),
  resultId: null,
  detailId: null,
  returnPage: "roles"
};

function getRole(roleId) {
  return roles.find((role) => role.id === roleId);
}

function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Een ontdekkingstocht bij Bruns</p>
        <h1>Welke rol speel jij?</h1>
        <p class="lead">Bij Bruns komen techniek, creativiteit en vakmanschap samen. Achter ieder project werkt een team met verschillende talenten. Maar welke rol past het beste bij jou? Beoordeel de stellingen en ontdek jouw rol.</p>
        <div class="button-row">
          <button class="button button-accent" type="button" data-action="start">Ontdek mijn rol <span aria-hidden="true">→</span></button>
          <button class="button button-secondary" type="button" data-action="all-roles">Bekijk alle rollen</button>
        </div>
        <p class="fine-print">Er zijn geen goede of foute antwoorden. Dit is geen officiële beroepskeuzetest.</p>
      </div>
      <div class="hero-art">
        <img src="Hoofdpagina_visualisatie.png" alt="Zeven rollen bij een Bruns-project">
      </div>
    </section>`;
}

function renderQuestion() {
  const index = state.questionIndex;
  const question = questionList[index];
  const selected = state.answers[index];
  const progress = ((index + 1) / questionList.length) * 100;
  const answerLabels = [
    "Past helemaal niet bij mij",
    "Past niet echt bij mij",
    "Past een beetje bij mij",
    "Past goed bij mij",
    "Past helemaal bij mij"
  ];

  app.innerHTML = `
    <section class="quiz-wrap" aria-label="Vragenlijst">
      <div class="quiz-topline">
        <span class="eyebrow">Ontdek jouw rol</span>
        <span class="question-count">Vraag ${index + 1} van ${questionList.length}</span>
      </div>
      <div class="progress-track" role="progressbar" aria-label="Voortgang vragenlijst" aria-valuemin="1" aria-valuemax="${questionList.length}" aria-valuenow="${index + 1}">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      <section class="question-card">
        <p class="eyebrow">Kies wat het beste bij jou past</p>
        <h1>${question.text}</h1>
        <div class="answer-grid" role="group" aria-label="Kies een antwoord van 1 tot 5">
          ${answerLabels.map((label, answerIndex) => {
            const value = answerIndex + 1;
            return `<button class="answer-button${selected === value ? " selected" : ""}" type="button" data-action="answer" data-value="${value}" aria-pressed="${selected === value}">
              <strong>${value}</strong><span>${label}</span>
            </button>`;
          }).join("")}
        </div>
        <div class="quiz-controls">
          <button class="button button-secondary" type="button" data-action="previous"${index === 0 ? " disabled" : ""}>← Vorige</button>
          <span class="quiz-hint">${selected === null ? "Kies een antwoord om verder te gaan." : "Je antwoord is opgeslagen."}</span>
          <button class="button" type="button" data-action="next"${selected === null ? " disabled" : ""}>${index === questionList.length - 1 ? "Bekijk resultaat" : "Volgende"} →</button>
        </div>
      </section>
    </section>`;
}

function renderRoles() {
  app.innerHTML = `
    <section>
      <div class="page-heading">
        <p class="eyebrow">De mensen achter het resultaat</p>
        <h2>Ontdek alle rollen</h2>
        <p class="lead">Geen project maken we alleen. Ontdek welke rollen samenwerken om een ontwerp tot leven te brengen.</p>
      </div>
      <div class="roles-grid">
        ${roles.map((role) => `
          <button class="role-card" type="button" data-action="open-role" data-role="${role.id}" aria-label="Ontdek de rol ${role.name}">
            <img src="${role.image}" alt="${role.name}" loading="lazy">
            <span class="role-card-copy">
              <h3>${role.name}</h3>
              <p>${role.short}</p>
              <span class="card-link">Ontdek deze rol <span aria-hidden="true">→</span></span>
            </span>
          </button>`).join("")}
      </div>
    </section>`;
}

function renderResult() {
  const role = getRole(state.resultId);
  app.innerHTML = `
    <section class="result-layout">
      <img class="result-image" src="${role.image}" alt="Afbeelding van de rol ${role.name}">
      <div class="result-copy">
        <p class="eyebrow">Jouw ontdekking</p>
        <h1>Jouw rol bij Bruns</h1>
        <h2 class="role-name">Jij bent de ${role.name}</h2>
        <p class="lead">${role.description}</p>
        <div class="traits" aria-label="Kenmerken">${role.traits.map((trait) => `<span class="trait">${trait}</span>`).join("")}</div>
        <div class="button-row">
          <button class="button button-accent" type="button" data-action="result-detail">Bekijk mijn rol</button>
          <button class="button button-secondary" type="button" data-action="all-roles">Bekijk alle rollen</button>
          <button class="button button-secondary" type="button" data-action="restart">Opnieuw testen</button>
        </div>
        <p class="fine-print disclaimer">Deze uitkomst laat zien welke rol op basis van jouw antwoorden het beste aansluit. Het is geen officiële beroepskeuzetest.</p>
      </div>
    </section>`;
}

function renderDetail() {
  const role = getRole(state.detailId);
  app.innerHTML = `
    <section>
      <button class="text-button detail-back" type="button" data-action="detail-back">← Terug</button>
      <div class="detail-layout">
        <img class="detail-image" src="${role.image}" alt="Afbeelding van de rol ${role.name}">
        <div class="detail-copy">
          <p class="eyebrow">Een rol bij Bruns</p>
          <h2>${role.name}</h2>
          <p class="lead">${role.description}</p>
          <h3>Past bij jou als je...</h3>
          <div class="traits">${role.traits.map((trait) => `<span class="trait">${trait}</span>`).join("")}</div>
          <div class="button-row">
            <button class="button button-secondary" type="button" data-action="all-roles">Bekijk alle rollen</button>
            <button class="button button-accent" type="button" data-action="start">Doe de test</button>
          </div>
        </div>
      </div>
    </section>`;
}

function render() {
  if (state.page === "home") renderHome();
  if (state.page === "quiz") renderQuestion();
  if (state.page === "roles") renderRoles();
  if (state.page === "result") renderResult();
  if (state.page === "detail") renderDetail();
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function calculateResult() {
  const totals = new Map(roles.map((role) => [role.id, { score: 0, fives: 0, fours: 0 }]));
  questionList.forEach((question, index) => {
    const answer = state.answers[index];
    const score = totals.get(question.roleId);
    score.score += answer;
    if (answer === 5) score.fives += 1;
    if (answer === 4) score.fours += 1;
  });

  return roles
    .map((role, order) => ({ role, order, ...totals.get(role.id) }))
    .sort((a, b) => b.score - a.score || b.fives - a.fives || b.fours - a.fours || a.order - b.order)[0].role.id;
}

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control) return;

  const action = control.dataset.action;
  if (action === "home") {
    state.page = "home";
  } else if (action === "start") {
    state.answers = Array(questionList.length).fill(null);
    state.questionIndex = 0;
    state.resultId = null;
    state.page = "quiz";
  } else if (action === "all-roles") {
    state.page = "roles";
  } else if (action === "open-role") {
    state.detailId = control.dataset.role;
    state.returnPage = "roles";
    state.page = "detail";
  } else if (action === "result-detail") {
    state.detailId = state.resultId;
    state.returnPage = "result";
    state.page = "detail";
  } else if (action === "detail-back") {
    state.page = state.returnPage;
  } else if (action === "answer") {
    state.answers[state.questionIndex] = Number(control.dataset.value);
  } else if (action === "previous" && state.questionIndex > 0) {
    state.questionIndex -= 1;
  } else if (action === "next" && state.answers[state.questionIndex] !== null) {
    if (state.questionIndex === questionList.length - 1) {
      state.resultId = calculateResult();
      state.page = "result";
    } else {
      state.questionIndex += 1;
    }
  } else if (action === "restart") {
    state.answers = Array(questionList.length).fill(null);
    state.questionIndex = 0;
    state.resultId = null;
    state.page = "home";
  }

  render();
});

render();
