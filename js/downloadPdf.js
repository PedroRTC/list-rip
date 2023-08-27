let button_pdf = document.querySelector(".button_pdf");

button_pdf.addEventListener("click", () => {
  let delete_employee_planilhe = document.querySelectorAll(
    ".delete_employee_planilhe"
  );
  delete_employee_planilhe.forEach((element) => {
    element.style.display = "none";
  });
  // Conteúdo do PDF
  const create_list = document.querySelector(".create_list");

  // Configuração do arquivo final de PDF

  const options = {
    margin: 0,
    filename: "ESCALA-RIP.pdf",
    image: { type: "png", quality: 0.98 },
    html2canvas: { escale: 1 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  // Gerar e baixar o PDF

  setTimeout(() => {
    html2pdf().set(options).from(create_list).save();
  }, 2000);

  setTimeout(() => {
    delete_employee_planilhe.forEach((element) => {
      element.style.display = "inline";
    });
  }, 4000);
  
});
