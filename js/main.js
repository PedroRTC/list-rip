let button_menu_list = document.querySelectorAll(".menu_list button");
let container_lists = document.querySelector(".container_lists");
let button_menu_bottom = document.querySelectorAll(".items_menu_bottom button");
let audio = document.querySelector("audio");

button_menu_list[0].classList.add("class_button_menu");

button_menu_list.forEach((element) => {
  element.addEventListener("click", () => {
    let class_button_menu = "class_button_menu";
    selectItem(element, class_button_menu);
  });
});

function selectItem(item, classItem) {
  item.classList.add(classItem);
  item.addEventListener("click", removeItem(item, classItem));
}

function removeItem(item, classItem) {
  let itemSelection = document.querySelectorAll(`.${classItem}`);

  for (const i of itemSelection) {
    if (i) {
      i.classList.remove(classItem);
      item.classList.add(classItem);
    }
  }
}

function menuList() {
  button_menu_list[0].addEventListener("click", () => {
    container_lists.scrollBy(-300, 0);
    button_menu_bottom.forEach((element) => {
      element.style.display = "none";
    });
  });

  button_menu_list[1].addEventListener("click", () => {
    container_lists.scrollBy(+300, 0);
    button_menu_bottom.forEach((element) => {
      element.style.display = "inline";
    });
  });
}

menuList();

function createElementWithClass(type, elementClass) {
  const element = document.createElement(type);
  element.classList.add(elementClass);
  return element;
}

function searchEmployee() {
  if (input_search.value.length >= 3) {
    filter_employee = backend_employee.filter(({ employee }) =>
      employee.toLowerCase().includes(input_search.value.toLowerCase())
    );
    let div_filter = createElementWithClass("div", "div_filter");
    window.document.body.appendChild(div_filter);
    addListEmployees(filter_employee, div_filter);
  }

  if (input_search.value.length < 3) {
    let element_filter = document.querySelector(".div_filter");

    if (element_filter) {
      window.document.body.removeChild(element_filter);
    }
  }
}

function checkEmployeeList(backend,object) {
  if (backend.length > 0) {
    let check_employee = backend.filter(
      (i) => i.employee.toUpperCase() == object.employee.toUpperCase()
    );

    if (check_employee.length == 1) {
      backend.push();
      desc_fedback.classList.add("fedback_repli");
      desc_fedback.innerHTML = "Funcionário já está na lista";
      fedback();
    } else {
      backend.push(object);
      desc_fedback.classList.add("fedback_add");
      desc_fedback.innerHTML = "Funcionário foi adicionado";
      fedback();
    }
  } else {
    backend.push(object);
    desc_fedback.classList.add("fedback_add");
    desc_fedback.innerHTML = "Funcionário foi adicionado";
    fedback();
  }
}

function deleteEmployee(backend, item, employee, list) {
  let index = backend.indexOf(item);
  list.removeChild(employee);

  if (index > -1) {
    backend.splice(index, 1);
  }
}

let container_fedback = createElementWithClass("div", "container_fedback");
let desc_fedback = createElementWithClass("div", "desc_fedback");

function fedback() {
  container_fedback.appendChild(desc_fedback);
  window.document.body.appendChild(container_fedback);

  setTimeout(() => {
    container_fedback.style.transform = "translateX(0%)";
    audio.play();
  }, 200);

  setTimeout(() => {
    container_fedback.style.transform = "translateX(100%)";
  }, 2000);

}
