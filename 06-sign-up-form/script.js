const form = document.querySelector(".signup-form");
const groups = document.querySelectorAll(".form-group");
const pwd = document.getElementById("pwd");
const confirmPwd = document.getElementById("confirm-pwd");
const confirmPwdGroup = confirmPwd.closest(".form-group");
const confirmPwdAlert = confirmPwdGroup.querySelector(".alert");

// add event listener to all input field
groups.forEach((group) => {
  const input = group.querySelector("input");
  const alert = group.querySelector(".alert");

  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.classList.remove("invalid");
      alert.textContent = "";
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleEmptyValidation();
  handlePasswordValidation();
});

function handleEmptyValidation() {
  groups.forEach((group) => {
    const input = group.querySelector("input");
    const alert = group.querySelector(".alert");

    if (input.value.trim() === "") {
      input.classList.add("invalid");
      alert.textContent = "*This field cannot be empty";
    }
  });
}

function handlePasswordValidation() {
  if (pwd.value !== confirmPwd.value) {
    confirmPwd.classList.add("invalid");
    confirmPwdAlert.textContent = "*Password does not match";
  } else if(confirmPwd.value!==''){
    confirmPwd.classList.remove("invalid");
    confirmPwdAlert.textContent = "";
  }
}

pwd.addEventListener("input", handlePasswordValidation);
confirmPwd.addEventListener("input", handlePasswordValidation);