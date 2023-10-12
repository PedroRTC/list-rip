let planilhe_employees = document.querySelector(".planilhe");
let title_list = document.querySelector(".title_list");

let button_close_planilhe = document.querySelector(".button_close_planilhe");

let backend_list = [];
let backend_title_list = "";

backend_title_list =
  JSON.parse(localStorage.getItem("backend_title_list")) || [];
backend_list = JSON.parse(localStorage.getItem("backend_list")) || [];

title_list.value = backend_title_list;

title_list.addEventListener("input", addBackendTitleList);
button_close_planilhe.addEventListener("click", obsClose);

function addBackendTitleList() {
  backend_title_list = title_list.value;
  localStorage.setItem(
    "backend_title_list",
    JSON.stringify(backend_title_list.toUpperCase())
  ) || [];
}

function addBackendPlanilhe(item, button_add_list) {
  button_add_list.classList.add("selection_button_add");
  let new_employee_list = {
    matri: item.matri,
    employee: item.employee,
    function: item.function,
  };

  checkEmployeeList(backend_list, new_employee_list);

  localStorage.setItem("backend_list", JSON.stringify(backend_list)) || [];

  planilhe_employees.innerHTML = "";
  addPlanilhe();
}

function addPlanilhe() {
  backend_list.map((item_planilhe) => {
    let employee_planilhe = createElementWithClass(
      "section",
      "employee_planilhe"
    );
    let matri_employee_planilhe = createElementWithClass("p", "matri_planilhe");
    let name_employee_planilhe = createElementWithClass(
      "p",
      "name_employee_planilhe"
    );
    let function_employee_planilhe = createElementWithClass(
      "p",
      "function_employee_planilhe"
    );

    let delete_employee_planilhe = createElementWithClass(
      "button",
      "delete_employee_planilhe"
    );

    matri_employee_planilhe.innerHTML = item_planilhe.matri;
    name_employee_planilhe.innerHTML = item_planilhe.employee;
    function_employee_planilhe.innerHTML = item_planilhe.function;
    delete_employee_planilhe.innerHTML = `<i class="bi bi-trash-fill"></i>`;

    employee_planilhe.appendChild(matri_employee_planilhe);
    employee_planilhe.appendChild(name_employee_planilhe);
    employee_planilhe.appendChild(function_employee_planilhe);
    employee_planilhe.appendChild(delete_employee_planilhe);

    if (item_planilhe.select) {
      newList(item_planilhe, delete_employee_planilhe);
    } else {
      planilhe_employees.appendChild(employee_planilhe);
    }

    delete_employee_planilhe.addEventListener("click", () => {
      deleteEmployee(
        backend_list,
        item_planilhe,
        employee_planilhe,
        planilhe_employees
      );
      localStorage.setItem("backend_list", JSON.stringify(backend_list)) || [];
    });
  });
}

addPlanilhe();

function newList(item, delet) {
  let section_turn = createElementWithClass("section", "section_date_turn");
  let select = createElementWithClass("select", "select_turn");
  let input_date = createElementWithClass("input", "date_list");
  let input_workload = createElementWithClass("input", "input_workload");

  select.innerHTML = `<option value="Manhã">Manhã</option>
  <option value="Manhã Extra">Manhã Extra</option>
  <option value="Noite">Noite</option>
  <option value="Noite Extra">Noite Extra</option>`;

  select.value = item.select;

  input_date.setAttribute("placeholder", `${item.date}`);
  input_workload.setAttribute("readonly", "readonly/");

  input_workload.value = item.workload;

  section_turn.appendChild(select);
  section_turn.appendChild(input_date);
  section_turn.appendChild(input_workload);
  section_turn.appendChild(delet);

  planilhe_employees.appendChild(section_turn);

  select.addEventListener("input", () => {
    changeTurn(select, input_workload);
    item.select = select.value;
    item.workload = input_workload.value;

    input_workload.value = item.workload;

    localStorage.setItem("backend_list", JSON.stringify(backend_list)) || [];
    console.log(item_planilhe);
  });

  delet.addEventListener("click", () => {
    deleteEmployee(backend_list, item, section_turn, planilhe_employees);
    localStorage.setItem("backend_list", JSON.stringify(backend_list)) || [];
  });
}

function obsClose() {
  let container_close_planilhe = createElementWithClass(
    "div",
    "container_close_planilhe"
  );
  let div_close_planilhe = createElementWithClass("div", "div_close_planilhe");
  let message_close_planilhe = createElementWithClass(
    "p",
    "message_close_planilhe"
  );
  let section_buttons_close = createElementWithClass(
    "section",
    "section_buttons_close"
  );
  let button_cancel = (document = createElementWithClass(
    "button",
    "button_cancel"
  ));
  let button_close = createElementWithClass("button", "button_close");

  message_close_planilhe.innerHTML = `Você ja salvou a sua planilhar?<br>Tem certeza que vai excluir?<br><span><strong>Obs:</strong>Todos os dados da planilhar sera apagados.</span>`;

  button_cancel.innerHTML = "Cancelar";
  button_close.innerHTML = "Excluir";

  div_close_planilhe.appendChild(message_close_planilhe);
  div_close_planilhe.appendChild(section_buttons_close);
  section_buttons_close.appendChild(button_cancel);
  section_buttons_close.appendChild(button_close);

  container_close_planilhe.appendChild(div_close_planilhe);
  window.document.body.appendChild(container_close_planilhe);

  setTimeout(() => {
    div_close_planilhe.style.transform = "scale(1)";
  }, 100);

  button_close.addEventListener("click", () => closePlanilhe(button_close));

  button_cancel.addEventListener("click", () =>
    cancelClosePlanilhe(div_close_planilhe)
  );
}

function closePlanilhe(button_close) {
  localStorage.removeItem("backend_title_list");
  localStorage.removeItem("backend_date");
  localStorage.removeItem("backend_list");

  button_close.innerHTML = `Excluindo...`;

  setTimeout(() => {
    window.document.location.reload();
    button_close.innerHTML = "Excluido";

    button_close.style.background = "rgb(140, 254, 140)";
  }, 3000);
}

function cancelClosePlanilhe(div_close_planilhe) {
  let elementClose = document.querySelector(".container_close_planilhe");

  if (elementClose) {
    div_close_planilhe.style.transform = "scale(0)";

    setTimeout(() => {
      window.document.body.removeChild(elementClose);
    }, 500);
  }
}
