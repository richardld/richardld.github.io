let bot = new RiveScript();

const responses = [
  './responses.rive'
];

bot.loadFile(responses).then(botReady).catch(botNotReady);

const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');
form.addEventListener("submit", (e) => {
  e.preventDefault();
  selfReply(input_box.value);
  input_box.value = "";
});

function botReply(message) {
  message_container.innerHTML += `<div class=”bot”>${message}</div>`;
  location.href = "#edge";
}

function selfReply(message) {
  message_container.innerHTML += `<div class=”self”>${message}</div>`;
  location.href = "#edge";
  
  bot.reply("local-user", message).then(function(reply) {
    botReply(reply);
  });
}

function botReady() {
  bot.sortReplies();
  botReply("Hello!");
}

function botNotReady(err) {
  console.log("An error has occurred.", err);
}