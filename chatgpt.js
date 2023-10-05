document.addEventListener("DOMContentLoaded", function() {
    const questionForm = document.getElementById("questionForm");
    const questionInput = document.getElementById("questionInput");
    const answerContainer = document.getElementById("answerContainer");
    const answer = document.getElementById("answer");
  
    let isFinanceMode = false; // Variável para controlar o modo financeiro
  
    questionForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const userQuestion = questionInput.value;
  
      if (isFinanceMode) {
        SendQuestion(userQuestion);
      } else {
        if (userQuestion.toLowerCase().includes("financeiro")) {
          isFinanceMode = true;
          SendQuestion("Você é um chat financeiro a partir de agora deve tratar apenas assuntos financeiros");
        } else {
          answer.textContent = "Por favor, trate apenas assuntos financeiros.";
          answerContainer.scrollTop = answerContainer.scrollHeight;
        }
      }
    });
  
    const OPENAI_API_KEY = "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";
  
    function SendQuestion(question) {
      var sQuestion = question;
  
      fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: sQuestion,
          max_tokens: 2048, // tamanho da resposta
          temperature: 0.5, // criatividade na resposta
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (answer.textContent) {
            answer.textContent += "\n";
          }
  
          if (json.error?.message) {
            answer.textContent += `Erro: ${json.error.message}`;
          } else if (json.choices?.[0].text) {
            var text = json.choices[0].text || "Sem resposta";
  
            answer.textContent += "Chat GPT: " + text;
          }
  
          answerContainer.scrollTop = answerContainer.scrollHeight;
        })
        .catch((error) => console.error("Erro:", error))
        .finally(() => {
          questionInput.value = "";
          questionInput.disabled = false;
          questionInput.focus();
        });
  
      if (answer.textContent) {
        answer.textContent += "\n\n\n";
      }
  
      answer.textContent += `Você: ${sQuestion}`;
      questionInput.value = "Carregando...";
      questionInput.disabled = true;
    }
  });
  