let userLogin = "pedro06portfolio@gmail.com";
let userPassword = "pr310642";
let backend_login = "";

let initialize_user = document.querySelector(".initialize_user");
let input_user = document.querySelector("#input_user");
let label_user = document.querySelector("#label_user");
let input_password = document.querySelector("#input_password");
let label_password = document.querySelector("#label_password");
let form_user = document.querySelector(".form_user");
let button_init = document.querySelector(".button_init");

let user = document.querySelector(".user");
let img_user = document.querySelector(".img_user");
let name_user = document.querySelector(".name_user");

backend_login = JSON.parse(localStorage.getItem("backend_login")) || [];

initialize_user.style.display = backend_login;

input_user.addEventListener("input", () => checkUser(input_user, label_user));
input_password.addEventListener("input", () =>
  checkPassword(input_password, label_password)
);

form_user.addEventListener("submit", initListRip);
img_user.addEventListener("click", optionCloseApp);

name_user.addEventListener("click", closeListRip);

function checkUser(input, label) {
  if (input.value == userLogin || input.value.length == 0) {
    label.innerHTML = "Usuário";
    label.style.color = "white";
  } else {
    label.innerHTML = "Usuário invalido";
    label.style.color = "rgb(156, 0, 0)";
  }
}

function checkPassword(input, label) {
  if (input.value == userPassword || input_password.value.length == 0) {
    label.innerHTML = "Senha";
    label.style.color = "white";
  } else {
    label.innerHTML = "Senha invalida";
    label.style.color = "rgb(156, 0, 0)";
  }
}

function initListRip(event) {
  event.preventDefault();

  if (input_user.value == userLogin && input_password.value == userPassword) {
    backend_login = "none";
    localStorage.setItem("backend_login", JSON.stringify(backend_login)) || [];
    button_init.innerHTML = "Iniciando...";

    setTimeout(() => {
      initialize_user.style.display = "none";
    }, 5000);
  }
}

function optionCloseApp() {
  user.style.flexDirection = "row-reverse";
  name_user.innerHTML = "Sair";

  img_user.removeEventListener("click", optionCloseApp);
  img_user.addEventListener("click", removeOptionCloseApp);
}

function removeOptionCloseApp() {
  user.style.flexDirection = "";
  name_user.innerHTML = "Pedro";

  img_user.addEventListener("click", optionCloseApp);
  img_user.removeEventListener("click", removeOptionCloseApp);
}

function closeListRip() {
  if (name_user.innerHTML == "Sair") {
    localStorage.removeItem("backend_login");
    name_user.innerHTML = "Saindo..";

    setTimeout(() => {
      window.document.location.reload();
    }, 3000);
  }
}
