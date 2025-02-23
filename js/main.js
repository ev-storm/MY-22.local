// document.querySelector("#title-video").playbackRate = 0.5;
const videoElement = document.querySelector("#title-video");
if (videoElement) {
  videoElement.playbackRate = 0.5;
}
//////////////////////////////////
const modalButtons = document.querySelectorAll(".btn-modal-call");

modalButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const modalCon = document.querySelector(".modal-con");
    document.querySelector(".modal-con").classList.remove("hide-prev");
    modalCon.classList.remove("hide");
    modalCon.classList.add("show");
  });
});

document
  .querySelector(".modal-con")
  .addEventListener("click", function (event) {
    if (!event.target.closest(".modal")) {
      document.querySelector(".modal-con").classList.remove("show");
      document.querySelector(".modal-con").classList.add("hide");
    }
  });

document.querySelector(".close-modal").addEventListener("click", function () {
  document.querySelector(".modal-con").classList.remove("show");
  document.querySelector(".modal-con").classList.add("hide");
});

// ...............................................

const form = document.querySelector(".modal-form");

const telSelector = form.querySelector(".input-tel");
const inputmask = new Inputmask("+7 (999) 999-99-99");
inputmask.mask(telSelector);

const validation = new JustValidate(".modal-form");

validation
  .addField(".input-name", [
    {
      rule: "minLength",
      value: 3,
      errorMessage: "Введите более 3 символов",
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Введите менее 30 символов",
    },
    {
      rule: "required",
      value: true,
      errorMessage: "Введите имя",
    },
  ])
  .addField(".input-tel", [
    {
      rule: "required",
      value: true,
      errorMessage: "Телефон обязателен",
    },
    {
      rule: "function",
      validator: function () {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: "Введите корректный телефон",
    },
  ])
  .onSuccess((event) => {
    console.log("Validation passes and form submitted", event);

    let formData = new FormData(event.target);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");

          document.querySelector(".modal-con").classList.remove("show");
          document.querySelector(".modal-con").classList.add("hide");

          const banСheck = document.querySelector(".ban-check");

          banСheck.classList.add("active");

          setTimeout(() => {
            banСheck.classList.remove("active");
          }, 4000);
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    event.target.reset();
  });

// Обрабатываем кнопку
const telBtn = document.querySelector(".tel-item-con");

const phoneNumber = "+7 916 230-25-78";

const messageElement = document.createElement("span");
messageElement.classList.add("copy-message");
messageElement.textContent = "Телефон скопирован";
document.querySelector(".tel-item-con").appendChild(messageElement);

telBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(phoneNumber)
    .then(() => {
      messageElement.style.display = "inline";

      setTimeout(() => {
        messageElement.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Не удалось скопировать текст: ", err);
    });
});
