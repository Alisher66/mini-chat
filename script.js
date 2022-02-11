
const nameEl = document.querySelector("#nickName");
const enterBtn = document.querySelector("#select");
const chatWrap = document.querySelector(".chat");
const textEl = document.querySelector("#message_text");
const sendBtn = document.querySelector("#send_message");
const messageWrap = document.querySelector("#message-wrap");

let nickName;

function loginUser() {

   enterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (nameEl.value.trim() == "") return
      nickName = nameEl.value.trim();
      nameEl.parentElement.classList.add("hide");
      chatWrap.classList.remove("hide");
   });
}

loginUser();


let url = "wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self";

const mySocket = new WebSocket(url);

sendBtn.addEventListener("click", sendMessage);
textEl.addEventListener("keypress", (e) => {
   if (e.which == 13) sendMessage(e);
})

function sendMessage(e) {
   e.preventDefault();
   const date = new Date();
   const text = textEl.value;
   if (text == "") return;
   const temlHtml = `<div class="message server">
                           <span class="time_message">${getDateFormat(date)}</span>
                           ${text}
                           <span class="user_name">${nickName}</span>
                        </div>`

   mySocket.send(temlHtml);
   textEl.value = "";
}


mySocket.onopen = function () {
   console.log("opening ", mySocket);
}

mySocket.onmessage = function (e) {
   messageWrap.innerHTML += e.data;
}
mySocket.onclose = function () {
   console.log('closed...');
}
mySocket.onerror = function () {
   console.log("error")
}



function getDateFormat(date) {
   let d = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
   let month = (date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
   let hours = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
   let minutes = date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes();
   return `${d}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
}
