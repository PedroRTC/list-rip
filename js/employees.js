let list_employees = document.querySelector(".list_employees");
let form_employees = document.querySelector(".form_employees");

let backend_employee = [];
let filter_employee = [];

form_employees.addEventListener("submit", addBackendEmployees);

backend_employee = JSON.parse(localStorage.getItem("backend_employee")) || [];

function addBackendEmployees(event) {
  event.preventDefault();
  new_employee = {
    matri: form_employees.matricula.value,
    employee: form_employees.nome.value,
    function: form_employees.cargo.value,
  };


  checkEmployeeList(backend_employee,new_employee);
 
  localStorage.setItem("backend_employee", JSON.stringify(backend_employee)) ||
    [];

  form_employees.reset()
    
    list_employees.innerHTML=""
    addListEmployees(backend_employee, list_employees);

}


function addListEmployees(backend, list) {
  backend.map((item) => {
    let employee = createElementWithClass("section", "employee");
    let input_matri = createElementWithClass("input", "input_matri");
    let input_name = createElementWithClass("input", "input_name");
    let input_function = createElementWithClass("input", "input_fuction");
    let button_change = createElementWithClass("button", "button_employee");
    let button_delete = createElementWithClass("button", "button_employee");
    let button_add_list = createElementWithClass("button", "button_employee");

    input_matri.value = item.matri;
    input_name.value = item.employee;
    input_function.value = item.function;

    button_change.innerHTML = `<img src="../img/editar.png">`;
    button_add_list.innerHTML = `<img src="../img/lista.png">`;
    button_delete.innerHTML = `<img src="../img/lixeira.png">`;

    input_matri.setAttribute("readonly", "readonly");
    input_matri.setAttribute("placeholder", "Matrícula");
    input_matri.setAttribute("type", "number");

    input_name.setAttribute("readonly", "readonly");
    input_function.setAttribute("readonly", "readonly");

    employee.appendChild(input_matri);
    employee.appendChild(input_name);
    employee.appendChild(input_function);
    employee.appendChild(button_change);
    employee.appendChild(button_add_list);
    employee.appendChild(button_delete);

    list.appendChild(employee);

    let input_employee = document.querySelectorAll(".employee input");

    employee.addEventListener("click", () => {
      let selection_employee = "selection_employee";
      selectItem(employee, selection_employee);
    });

    button_change.addEventListener("click", () =>
      inputReodonly(input_employee, button_change)
    );

    button_add_list.addEventListener("click", () => {
      addBackendPlanilhe(item, button_add_list);
    });

    button_delete.addEventListener("click", () => {
      deleteEmployee(backend, item, employee, list_employees);

      localStorage.setItem(
        "backend_employee",
        JSON.stringify(backend_employee)
      ) || [];
    });

    input_employee.forEach((element) => {
      element.addEventListener("input", () => {
        changeEmployee(item, input_matri, input_name, input_function);
      });
    });
  });
}

addListEmployees(backend_employee, list_employees);



function inputReodonly(input_employee, button_change) {
  button_change.classList.add("selection_button");
  input_employee.forEach((element) => {
    element.removeAttribute("readonly", "readonly");
    element.style.background = "white";
    element.focus();
  });
  button_change.addEventListener("click", () =>
    removeReodonly(input_employee, button_change)
  );
  button_change.removeEventListener("click", () => inputReodonly);
}

function removeReodonly(input_employee, button_change) {
  button_change.classList.remove("selection_button");
  input_employee.forEach((element) => {
    element.setAttribute("readonly", "readonly");
    element.style.background = "";
  });

  button_change.addEventListener("click", () =>
    inputReodonly(input_employee, button_change)
  );
  button_change.removeEventListener("click", () => removeReodonly);
}

function changeEmployee(item, input_matri, input_name, input_function) {
  backend_employee.map((i) => {
    let index = backend_employee.indexOf(item);
    let il = backend_employee.indexOf(i);
    if (index == il) {
      i.matri = input_matri.value;
      i.employee = input_name.value;
      i.function = input_function.value;
    }
  });

  localStorage.setItem("backend_employee", JSON.stringify(backend_employee)) ||
    [];
}
