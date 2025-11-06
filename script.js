const questoes = [
 { texto: "Quanto é 10% de 200?", opcoes: ["10", "15", "20", "25"], correta: 2 },
  { texto: "Quanto é 25% de 100?", opcoes: ["20", "25", "30", "40"], correta: 1 },
  { texto: "Quanto é 50% de 60?", opcoes: ["25", "30", "35", "40"], correta: 1 },
  { texto: "Quanto é 20% de 50?", opcoes: ["5", "8", "10", "12"], correta: 2 },
  { texto: "Quanto é 5% de 400?", opcoes: ["10", "15", "20", "25"], correta: 2 },
  { texto: "Se um produto custa R$100 e tem desconto de 10%, qual o preço final?", opcoes: ["R$80", "R$85", "R$90", "R$95"], correta: 2 },
  { texto: "Um aumento de 20% em R$50 resulta em:", opcoes: ["R$55", "R$60", "R$65", "R$70"], correta: 1 },
  { texto: "Quanto é 30% de 90?", opcoes: ["20", "25", "27", "30"], correta: 2 },
  { texto: "Se 40 alunos representam 80% do total, qual é o total?", opcoes: ["45", "48", "50", "55"], correta: 2 },
  { texto: "Quanto é 15% de 200?", opcoes: ["25", "30", "35", "40"], correta: 1 },
  { texto: "Um item de R$120 tem 25% de desconto. Quanto ele custa agora?", opcoes: ["R$80", "R$85", "R$90", "R$95"], correta: 2 },
  { texto: "Quanto é 10% de 80?", opcoes: ["6", "8", "10", "12"], correta: 1 },
  { texto: "Um preço de R$60 foi aumentado em 50%. Qual é o novo valor?", opcoes: ["R$80", "R$85", "R$90", "R$100"], correta: 0 },
  { texto: "Se um produto custa R$200 e sobe 10%, qual o novo preço?", opcoes: ["R$210", "R$215", "R$220", "R$225"], correta: 0 },
  { texto: "Quanto é 75% de 80?", opcoes: ["50", "55", "60", "65"], correta: 2 },
  { texto: "Um desconto de 20% em R$150 reduz o valor para:", opcoes: ["R$110", "R$115", "R$120", "R$125"], correta: 2 },
  { texto: "Quanto é 40% de 250?", opcoes: ["80", "90", "100", "110"], correta: 2 },
  { texto: "Um aumento de 10% em R$300 é:", opcoes: ["R$310", "R$320", "R$330", "R$340"], correta: 2 },
  { texto: "Quanto é 5% de 500?", opcoes: ["20", "25", "30", "35"], correta: 1 },
  { texto: "Se um valor de R$400 é reduzido em 25%, quanto sobra?", opcoes: ["R$250", "R$275", "R$300", "R$325"], correta: 2 }
];

let nome = "";
let indiceAtual = 0;
let pontuacao = 0;

function iniciarJogo() {
  const nomeInput = document.getElementById("nomeJogador").value.trim();
  if (nomeInput === "") {
    alert("Por favor, digite seu nome antes de começar!");
    return;
  }
  nome = nomeInput;
  document.getElementById("inicio").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  mostrarQuestao();
}

function mostrarQuestao() {
  const questao = questoes[indiceAtual];
  document.getElementById("pergunta").textContent = questao.texto;
  document.getElementById("feedback").textContent = "";
  document.getElementById("proximoBtn").style.display = "none";

  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.innerHTML = "";

  questao.opcoes.forEach((opcao, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="resposta" value="${i}"> ${opcao}`;
    label.querySelector("input").addEventListener("change", () => verificarResposta(i));
    opcoesDiv.appendChild(label);
    opcoesDiv.appendChild(document.createElement("br"));
  });
}

function verificarResposta(indiceEscolhido) {
  const questao = questoes[indiceAtual];
  const opcoes = document.querySelectorAll('input[name="resposta"]');
  opcoes.forEach(op => (op.disabled = true));

  const labels = document.querySelectorAll("#opcoes label");

  if (indiceEscolhido === questao.correta) {
    pontuacao++;
    labels[indiceEscolhido].classList.add("opcao-certa");
    document.getElementById("feedback").innerHTML = "<span class='correto'>✅ Correto!</span>";
    // Passa automaticamente para a próxima questão após 1 segundo
    setTimeout(() => {
      indiceAtual++;
      if (indiceAtual < questoes.length) {
        mostrarQuestao();
      } else {
        mostrarResultado();
      }
    }, 1000);
  } else {
    labels[indiceEscolhido].classList.add("opcao-errada");
    labels[questao.correta].classList.add("opcao-certa");
    document.getElementById("feedback").innerHTML = "<span class='errado'>❌ Errado!</span>";
    // Mostra botão "Próxima" apenas se errar
    document.getElementById("proximoBtn").style.display = "inline-block";
  }
}

function proximaQuestao() {
  indiceAtual++;
  if (indiceAtual < questoes.length) {
    mostrarQuestao();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "block";

  const total = questoes.length;
  const percentual = Math.round((pontuacao / total) * 100);
  document.getElementById("mensagemFinal").innerHTML =
    `${nome}, você acertou ${pontuacao} de ${total} questões (${percentual}%)! 🎯`;

  salvarRanking(nome, percentual);
  mostrarRanking();
}

function salvarRanking(nome, score) {
  let ranking = JSON.parse(localStorage.getItem("rankingQuiz")) || [];
  ranking.push({ nome, score });
  ranking.sort((a, b) => b.score - a.score);
  ranking = ranking.slice(0, 5);
  localStorage.setItem("rankingQuiz", JSON.stringify(ranking));
}

function mostrarRanking() {
  const rankingDiv = document.getElementById("ranking");
  const ranking = JSON.parse(localStorage.getItem("rankingQuiz")) || [];

  if (ranking.length === 0) {
    rankingDiv.innerHTML = "<h3>🏅 Ranking</h3><p>Ainda não há pontuações.</p>";
    return;
  }

  let html = "<h3>🏅 Ranking</h3><ol>";
  ranking.forEach(item => {
    html += `<li>${item.nome} — ${item.score}%</li>`;
  });
  html += "</ol>";
  rankingDiv.innerHTML = html;
}

function reiniciar() {
  indiceAtual = 0;
  pontuacao = 0;
  document.getElementById("resultado").style.display = "none";
  document.getElementById("inicio").style.display = "block";
  document.getElementById("nomeJogador").value = "";
}
