document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const checkEmailButton = document.getElementById("checkEmailButton");
  const message = document.getElementById("message");

  checkEmailButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.textContent = "Ange en giltig e-postadress.";
      message.style.color = "#fac0b1";
      return;
    }

    fetch("../api/data.json")
      .then((response) => response.json())
      .then((data) => {
        const validEmails = data.validEmails;
        const messages = data.messages;

        if (email.endsWith("@knowit.se")) {
          if (validEmails.includes(email)) {
            message.textContent = messages.alreadyRegistered.sv;
            message.style.color = "#cfceff";
          } else {
            message.textContent = messages.emailNotInList.sv;
            message.style.color = "#cfceff";
          }
        } else {
          message.textContent = messages.notKnowitEmployee.sv;
          message.style.color = "#fac0b1";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.textContent = messages.fetchError.sv;
        message.style.color = "#fac0b1";
      });
  });
});
