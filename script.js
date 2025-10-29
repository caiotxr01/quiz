let perguntas = [];
let indice = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const resultadoEl = document.getElementById("resultado");
const botaoProxima = document.getElementById("next-btn");
const progressoEl = document.getElementById("progresso");

// 🔹 Carrega as perguntas do arquivo JSON
fetch("perguntas.json")
  .then(res => res.json())
  .then(dados => {
    perguntas = dados;
    mostrarPergunta();
  })
  .catch(err => {
    perguntaEl.textContent = "Erro ao carregar perguntas 😢";
    console.error("Erro ao carregar JSON:", err);
  });

function mostrarPergunta() {
  const perguntaAtual = perguntas[indice];
  progressoEl.textContent = `Pergunta ${indice + 1} de ${perguntas.length}`;
  perguntaEl.textContent = perguntaAtual.texto;
  opcoesEl.innerHTML = "";
  resultadoEl.textContent = "";
  botaoProxima.style.display = "none";

  perguntaAtual.opcoes.forEach((opcao, i) => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.onclick = () => verificarResposta(i);
    opcoesEl.appendChild(botao);
  });
}

function verificarResposta(i) {
  const correta = perguntas[indice].correta;
  Array.from(opcoesEl.children).forEach((b, index) => {
    if (index === correta) b.style.backgroundColor = "#4CAF50"; // verde
    else if (index === i) b.style.backgroundColor = "#f44336"; // vermelho
    b.disabled = true;
  });

  if (i === correta) {
    resultadoEl.textContent = "✅ Correto!";
    pontuacao++;
  } else {
    resultadoEl.textContent = "❌ Errado!";
  }

  botaoProxima.style.display = "inline-block";
}

botaoProxima.onclick = () => {
  indice++;
  if (indice < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultadoFinal();
  }
};

function mostrarResultadoFinal() {
  perguntaEl.textContent = "Quiz finalizado!";
  opcoesEl.innerHTML = "";
  resultadoEl.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas. 🎯`;
  progressoEl.textContent = "";
  botaoProxima.textContent = "Reiniciar";
  botaoProxima.style.display = "inline-block";
  botaoProxima.onclick = reiniciarQuiz;
}

function reiniciarQuiz() {
  indice = 0;
  pontuacao = 0;
  botaoProxima.textContent = "Próxima";
  mostrarPergunta();
}
