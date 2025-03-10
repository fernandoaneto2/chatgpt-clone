const apiKey =
  "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";

function sendMessage() {
  var message = document.getElementById("message-input");
  if (!message.value) {
    message.style.border = "1px solid red";
    return;
  }
  message.style.border = "none";

  var status = document.getElementById("status");
  var btnSubmit = document.getElementById("btn-submit");

  status.style.display = "block";
  status.innerHTML = "Carregando...";
  btnSubmit.disabled = true;
  btnSubmit.style.cursor = "not-allowed";
  message.disabled = true;

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Ou "gpt-4" se você estiver usando essa versão
      messages: [{ role: "user", content: message.value }],
      max_tokens: 2048,
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response && response.choices && response.choices.length > 0) {
        let r = response.choices[0].message.content;
        status.style.display = "none";
        showHistory(message.value, r);
      } else {
        console.log("Resposta inesperada ou vazia.");
        status.innerHTML = "Erro: Sem resposta válida.";
      }
    })
    .catch((e) => {
      console.log(`Error -> ${e}`);
      status.innerHTML = "Erro, tente novamente mais tarde...";
    })
    .finally(() => {
      btnSubmit.disabled = false;
      btnSubmit.style.cursor = "pointer";
      message.disabled = false;
      message.value = "";
    });
}

function showHistory(message, response) {
  var historyBox = document.getElementById("history");

  // My message
  var boxMyMessage = document.createElement("div");
  boxMyMessage.className = "box-my-message";

  var myMessage = document.createElement("p");
  myMessage.className = "my-message";
  myMessage.innerHTML = message;

  boxMyMessage.appendChild(myMessage);

  historyBox.appendChild(boxMyMessage);

  // Response message
  var boxResponseMessage = document.createElement("div");
  boxResponseMessage.className = "box-response-message";

  var chatResponse = document.createElement("p");
  chatResponse.className = "response-message";
  chatResponse.innerHTML = response;

  boxResponseMessage.appendChild(chatResponse);

  historyBox.appendChild(boxResponseMessage);

  // Levar scroll para o final
  historyBox.scrollTop = historyBox.scrollHeight;
}
