const perguntas = [
  { texto: "Quanto é 5 + 7?", opcoes: ["10", "12", "13", "11"], correta: 1 },
  { texto: "Qual é o dobro de 9?", opcoes: ["16", "18", "20", "19"], correta: 1 },
  { texto: "Quanto é 6 x 8?", opcoes: ["42", "46", "48", "50"], correta: 2 },
  { texto: "Qual é a raiz quadrada de 81?", opcoes: ["7", "8", "9", "10"], correta: 2 },
  { texto: "Quanto é 15 - 6?", opcoes: ["8", "9", "10", "11"], correta: 1 },
  { texto: "Qual é o valor de x em 2x + 4 = 10?", opcoes: ["x = 2", "x = 3", "x = 4", "x = 5"], correta: 2 },
  { texto: "Quanto é (3² + 4²)?", opcoes: ["12", "25", "18", "20"], correta: 1 },
  { texto: "Quanto é 1/2 + 2/3?", opcoes: ["7/6", "3/5", "5/6", "4/5"], correta: 0 },
  { texto: "Quanto é (10² - 6²) / 4?", opcoes: ["16", "20", "18", "14"], correta: 1 },
  { texto: "Se 5x = 3x + 12, quanto vale x?", opcoes: ["4", "6", "8", "12"], correta: 0 }
];

let indice = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const resultadoEl = document.getElementById("resultado");
const botaoProxima = document.getElementById("next-btn");
const progressoEl = document.getElementById("progresso");

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
    else if (index === i) b.style.backgroundColor = "#f44336"; // vermelho se errada
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

mostrarPergunta();
