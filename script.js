const storyData = {
  Início: {
    text: `Bem-vindo à aventura de Lúcia em Eldoria. Você encontrou um diário antigo que fala sobre a misteriosa Pedra da Luz, 
           que pode trazer paz ou destruição ao reino. Você se encontra em uma bifurcação, onde três caminhos se abrem diante de você: 
           <a href="#" data-target="Montanhas_Nevadas">Montanhas Nevadas</a>, <a href="#" data-target="Floresta_Misteriosa">Floresta Misteriosa</a> ou 
           <a href="#" data-target="Caverna_Proibida">Caverna Proibida</a>.`,
    resetHistory: true,
  },
  Montanhas_Nevadas: {
    text: `Você decide seguir para as Montanhas Nevadas. O frio é intenso e a neve cobre tudo ao seu redor. 
           De repente, você encontra um anão chamado Thorin, que oferece ajuda em troca de um favor. 
           Você pode <a href="#" data-target="Ajudar_Thorin">ajudar Thorin</a> ou <a href="#" data-target="Ignorar_Thorin">ignorar Thorin</a>.`,
  },
  Ajudar_Thorin: {
    text: `Thorin precisa de você para recuperar um artefato perdido em uma caverna próxima. 
           Juntos, vocês enfrentam os perigos e conseguem recuperar o artefato. Thorin agradece e lhe dá o Escudo do Valor. 
           <a href="#" data-target="Início">Voltar à bifurcação.</a>.`,
    reward: "Escudo do Valor",
    showHistory: true,
  },
  Ignorar_Thorin: {
    text: `Você decide não ajudar Thorin e continua sua jornada sozinho. 
           O frio aumenta e você se perde na tempestade. Após horas vagando, você retorna ao início sem itens. 
           <a href="#" data-target="Início">Retornar à bifurcação.</a>.`,
    showHistory: true,
  },
  Floresta_Misteriosa: {
    text: `A Floresta Misteriosa é densa e cheia de sons estranhos. 
           Você encontra uma fada chamada Lyra, que oferece um teste de inteligência. 
           Você pode <a href="#" data-target="Desafio_Lyra">aceitar o desafio</a> ou <a href="#" data-target="Sair_Floresta">sair da floresta</a>.`,
  },
  Desafio_Lyra: {
    text: `Lyra apresenta um enigma que você consegue resolver com astúcia. 
           Impressionada, ela lhe dá a Poção do Conhecimento, que aumenta sua sabedoria. 
           <a href="#" data-target="Início">Retornar à bifurcação.</a>.`,
    reward: "Poção do Conhecimento",
    showHistory: true,
  },
  Sair_Floresta: {
    text: `Você decide que a floresta é muito arriscada e sai rapidamente. 
           Ao voltar, você se depara novamente com a bifurcação. 
           <a href="#" data-target="Início">Retornar à bifurcação.</a>.`,
    showHistory: true,
  },

  Caverna_Proibida: {
    text: `Na Caverna Proibida, a escuridão é opressora e você sente uma presença estranha. 
           Um espírito guardião aparece e exige que você prove seu valor. 
           Você pode <a href="#" data-target="Enfrentar_Espírito">enfrentar o espírito</a> ou <a href="#" data-target="Fugir_Caverna">fugir da caverna</a>.`,
  },
  Enfrentar_Espírito: {
    text: `Você enfrenta o espírito com bravura e, após uma intensa batalha, consegue derrotá-lo. 
           Ele lhe concede a Lâmina da Luz, uma arma poderosa que brilha na escuridão. 
           <a href="#" data-target="Início">Retornar à bifurcação.</a>.`,
    reward: "Lâmina da Luz",
    showHistory: true,
  },
  Fugir_Caverna: {
    text: `Você decide que a caverna é muito aterrorizante e foge rapidamente. 
           Ao sair, você se vê de volta na bifurcação. 
           <a href="#" data-target="Início">Retornar à bifurcação.</a>.`,
    showHistory: true,
  },
};

const app = document.getElementById("app");
 let currentStep = new URLSearchParams(window.location.search).get('step') || localStorage.getItem("lastStep") || "Início";
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let journeyHistory = JSON.parse(localStorage.getItem("journeyHistory")) || [];

function saveProgress(step, choiceText) {
  if (storyData[step]?.resetHistory) {
    journeyHistory = [];
  }
  if (choiceText) journeyHistory.push(choiceText);
  localStorage.setItem("journeyHistory", JSON.stringify(journeyHistory));
  localStorage.setItem("lastStep", step);
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

function renderStory() {
  const step = storyData[currentStep];
  const storyText = step.text;
  let output = `<p>${storyText}</p>`;
  if (step.reward) {
    output += `<p>Você recebeu: ${step.reward}</p>`;
    inventory.push(step.reward);
  }

  if (step.showHistory) {
    output += `<p><strong>Histórico da jornada:</strong><br>${journeyHistory.join('<br>')}</p>`;
  }

  app.innerHTML = output;

  const links = app.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      saveProgress(target, link.textContent);
      currentStep = target;
      window.history.pushState(null, "", `?step=${target}`);
      renderStory();
    });
  });
}

renderStory();
