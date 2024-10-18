const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const dob = document.getElementById("dob");
const cpf = document.getElementById("cpf");
const cep = document.getElementById("cep");
const address = document.getElementById("address");
let isCepValid = false;
form.addEventListener("submit", (e) => {
 e.preventDefault();
 checkInputs();
});
cep.addEventListener("blur", () => {
 if (cep.value.trim() !== "") {
   fetchAddressByZipCode(cep.value);
 }
});
function checkInputs() {
 const usernameValue = username.value.trim();
 const emailValue = email.value.trim();
 const passwordValue = password.value.trim();
 const passwordConfirmationValue = passwordConfirmation.value.trim();
 const dobValue = dob.value;
 const cpfValue = cpf.value.trim();
 const cepValue = cep.value.trim();
 if (usernameValue === "") {
   setErrorFor(username, "O nome de usuário é obrigatório.");
 } else {
   setSuccessFor(username);
 }
 if (emailValue === "") {
   setErrorFor(email, "O email é obrigatório.");
 } else if (!checkEmail(emailValue)) {
   setErrorFor(email, "Por favor, insira um email válido.");
 } else {
   setSuccessFor(email);
 }
 if (passwordValue === "") {
   setErrorFor(password, "A senha é obrigatória.");
 } else if (passwordValue.length < 7) {
   setErrorFor(password, "A senha precisa ter no mínimo 7 caracteres.");
 } else {
   setSuccessFor(password);
 }
 if (passwordConfirmationValue === "") {
   setErrorFor(passwordConfirmation, "A confirmação de senha é obrigatória.");
 } else if (passwordConfirmationValue !== passwordValue) {
   setErrorFor(passwordConfirmation, "As senhas não conferem.");
 } else {
   setSuccessFor(passwordConfirmation);
 }
 if (dobValue === "") {
   setErrorFor(dob, "A data de nascimento é obrigatória.");
 } else {
   setSuccessFor(dob);
 }
 if (cpfValue === "") {
   setErrorFor(cpf, "O CPF é obrigatório.");
 } else if (!validateCPF(cpfValue)) {
   setErrorFor(cpf, "CPF inválido.");
 } else {
   setSuccessFor(cpf);
 }
 if (!isCepValid) {
   setErrorFor(cep, "O CEP precisa ser válido.");
 }
 const formControls = form.querySelectorAll(".form-control");
 const formIsValid = [...formControls].every((formControl) => {
   return formControl.classList.contains("success");
 });
 if (formIsValid && isCepValid) {
   alert("Formulário enviado com sucesso!");
 } else {
   alert("Preencha todos os campos corretamente.");
 }
}
function setErrorFor(input, message) {
 const formControl = input.parentElement;
 const small = formControl.querySelector("small");
 small.innerText = message;
 formControl.className = "form-control error";
 alert(message); // Exibe uma notificação com a mensagem de erro
}
function setSuccessFor(input) {
 const formControl = input.parentElement;
 formControl.className = "form-control success";
}
function checkEmail(email) {
 return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
// Função para buscar endereço por CEP usando a API ViaCEP
async function fetchAddressByZipCode(zipCode) {
 try {
   const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
   const data = await response.json();
   if (data.erro) {
     setErrorFor(cep, "CEP inválido.");
     isCepValid = false;
   } else {
     address.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
     setSuccessFor(cep);
     setSuccessFor(address);
     isCepValid = true;
   }
 } catch (error) {
   setErrorFor(cep, "Erro ao buscar o endereço.");
   isCepValid = false;
 }
}
// Função de validação de CPF
function validateCPF(cpf) {
 cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
 if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
   return false; // Verifica se todos os dígitos são iguais
 }
 let soma = 0;
 let resto;
 // Validação do primeiro dígito
 for (let i = 1; i <= 9; i++) {
   soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
 }
 resto = (soma * 10) % 11;
 if (resto === 10 || resto === 11) resto = 0;
 if (resto !== parseInt(cpf.substring(9, 10))) return false;
 soma = 0;
 // Validação do segundo dígito
 for (let i = 1; i <= 10; i++) {
   soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
 }
 resto = (soma * 10) % 11;
 if (resto = (soma * 10) % 11);
 if (resto === 10 || resto === 11) resto = 0;
 if (resto !== parseInt(cpf.substring(10, 11))) return false;
 return true;
}